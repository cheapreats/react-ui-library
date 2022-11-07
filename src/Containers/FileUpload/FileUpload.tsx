import React, {
    useCallback,
    useRef,
    useEffect,
    useLayoutEffect,
    useReducer,
    useState,
} from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { TextLayout } from '@Layouts';
import Dropzone, { useDropzone } from 'react-dropzone';
import { Image } from '@styled-icons/fa-solid/Image';
import { CheckCircle } from '@styled-icons/fa-solid/CheckCircle';
import { TimesCircle } from '@styled-icons/fa-solid/TimesCircle';
import { MainTheme } from '@Themes';
import { useMounted } from '@Utils/Hooks';
// @ts-ignore
import worker from 'workerize-loader!./worker'; // eslint-disable-line
import { Loading } from '../Loading/Loading';
import { BottomPanel } from './BottomPanel';
import { Container, Icon } from './StyledComponents';
import { FileMovingAnimation } from './FileMovingAnimation';
import {
    IsFailureIsSuccessPanel,
    IIsFailureIsSuccessPanelProps,
} from './IsFailureIsSuccessPanel';
import { NO_BASE64STRINGFILE } from './constants';
import reducer, {
    IFileUploadState,
    SET_COMPONENT_WIDTH,
    SET_HEIGHT,
    SET_INITIAL_HEIGHT_PLUS_VALUES,
    SET_INITIAL_HEIGHT_VALUES,
    SET_IS_DRAG_ENTER,
    SET_IS_SUCCESS_WIDTH,
    SET_LOADING_CONTAINER_HEIGHT,
    SET_OPACITY_IS_FAILURE,
    SET_OPACITY_IS_SUCCESS,
    SET_OPACITY_LOADING,
    SET_POSITION_TOP_LOADING,
    SET_TOTAL_HEIGHT_PLUS,
    LOADING_RESTORE,
    IS_FAILURE_RESTORE,
    IS_SUCCESS_RESTORE,
    ADD_LOADING_IS_SUCCESS_IS_FAILURE,
    RESET_LOADING_IS_SUCCESS_IS_FAILURE,
    REMOVE_LOADING_IS_SUCCESS_IS_FAILURE,
} from './reducer';

// TODO: Add animations if possible (height transitions of the container component (expansion-contraction))
// and fade-in, fade-out effect of the informative panels.

const MESSAGE_DURATION = 1500;
const SUCCESS_MESSAGE = 'Completed';
const FAILURE_MESSAGE = 'Something went wrong';
const TITLE = 'Drop your files here, or click to browse';
const SUBTITLE = 'Admits any kind of files';
const TRANSITION_HEIGHT_ANIMATION_DURATION = 200;

const PADDING = 10;
const MARGIN = 10;

interface ISpecificValues {
    /** value of truth for the state of the panel; example: is success is true or false */
    value: boolean;
    /** opacity of the panel, used for animation */
    opacity: number;
    /** when true panel is positioned absolute */
    isPosition: boolean;
}

interface IValue {
    /** is success state for the panel */
    isSuccess: ISpecificValues;
    /** is failure state for the panel */
    isFailure: ISpecificValues;
    /** is uploading state for the panel */
    isUploading: ISpecificValues;
    /** name of file associated with the informative panel */
    name: string;
    /** worker; will do the job of reading the file */
    worker: Worker;
    /** the file associated with the informative panel */
    file: File;
}

interface IInformativePanelsState {
    /** array of panels */
    values: IValue[];
    /** names of files already uploaded, or failed, or cancelled */
    makeItDisappear: string[];
    /** names of files for which we want to start workers */
    startWorkers: string[];
}

export interface IFileUploadProps {
    /** the title message; default value: 'Drop your files here, or click to browse' */
    title?: string;
    /** the subtitle message; default value: 'Admits any kind of file' */
    subTitle?: string;
    /** minimum height for the component; optional */
    minHeight?: number;
    /** minimum width for the component; optional */
    minWidth?: number;
    /**
     * function to process the file read and transformed to a base64 string; default: does nothing
     * @param {string} base64StringFile the file read and transformed to a base64 string
     */
    doWithBase64StringFile?: (base64StringFile: string) => void;
    /** message of the bottom panel to inform of the success of the operation of reading the file content; default value: 'Completed' */
    successMessage?: string;
    /** message of the bottom panel to inform of the failure of the operation of reading the file content; default value: 'Something went wrong' */
    failureMessage?: string;
    /** if true, disables the component functionality; default value: false */
    isDisabled?: boolean;
    /** time in ms of the presence of the bottom panel informing the result of the operation (sucess or failure); default value: 1500  */
    messageDuration?: number;
    /** if true, failure message will appear even after success operation; its purpose is to test the appearance of the failure message during development */
    isTestIsFailure?: boolean;
    /** height and fade in-fade out animation duration in ms; default value: 200 */
    heightAndOpacityTransitionDuration?: number;
}

/** multiple file upload in parallel */
export const FileUpload: React.FC<IFileUploadProps> = ({
    title = TITLE,
    subTitle = SUBTITLE,
    minHeight,
    minWidth,
    doWithBase64StringFile = (base64StringFile: string) => null,
    successMessage = SUCCESS_MESSAGE,
    failureMessage = FAILURE_MESSAGE,
    isDisabled = false,
    messageDuration = MESSAGE_DURATION,
    isTestIsFailure,
    heightAndOpacityTransitionDuration = TRANSITION_HEIGHT_ANIMATION_DURATION,
}): React.ReactElement => {
    const [informativePanelsState, setInformativePanelsState] =
        useState<IInformativePanelsState>({
            values: [],
            makeItDisappear: [],
            startWorkers: [],
        });
    const initState: IFileUploadState = {
        height: undefined,
        totalHeight: 0,
        totalHeightPlus: 0,
        maxHeight: undefined,
        loading: [],
        isSuccess: [],
        isFailure: [],
        positionTopLoading: 0,
        loadingContainerHeight: 0,
        componentWidth: 0,
        isSuccessWidth: 0,
        isDragEnter: false,
    };
    const [state, dispatch] = useReducer(reducer, initState);
    const isMounted = useMounted();
    /**
     * ref to the most outer container, which contains everything else
     */
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingContainerRef = useRef<HTMLDivElement>(null);

    /**
     * load array of informative panels (values) and send order to start workers
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const informativePanels = acceptedFiles.map((file) => {
            const workerInstance = worker();
            return {
                isSuccess: { value: false, isPosition: false, opacity: 1 },
                isFailure: { value: false, isPosition: false, opacity: 1 },
                isUploading: { value: true, isPosition: false, opacity: 1 },
                name: file.name,
                worker: workerInstance,
                file,
            };
        });
        const fileNames = acceptedFiles.map((file) => file.name);
        setInformativePanelsState((prev) => ({
            ...prev,
            values: [...prev.values, ...informativePanels],
            startWorkers: [...fileNames],
        }));
        dispatch({ type: SET_IS_DRAG_ENTER, value: false });
    }, []);

    /**
     * terminate worker and set state of informative panel to success or failure and
     * send order to remove informative panel in the future. also do whatever user
     * wants to do with the file read in case of success
     */
    const onWorkerMessage = useCallback(
        (e: any) => {
            const { base64StringFile, name } = e.data;
            if (base64StringFile === undefined) {
                return;
            }
            const informativePanel = informativePanelsState.values.find(
                (value) => value.name === name,
            );
            if (informativePanel) {
                if (
                    base64StringFile === NO_BASE64STRINGFILE ||
                    isTestIsFailure
                ) {
                    setInformativePanelsState((prev) => ({
                        ...prev,
                        values: prev.values.map((value) => {
                            if (value.name === informativePanel.name)
                                return {
                                    ...value,
                                    isSuccess: {
                                        ...value.isSuccess,
                                        value: false,
                                    },
                                    isFailure: {
                                        ...value.isFailure,
                                        value: true,
                                    },
                                    isUploading: {
                                        ...value.isUploading,
                                        value: false,
                                    },
                                };
                            return value;
                        }),
                        makeItDisappear: [
                            ...prev.makeItDisappear,
                            informativePanel.name,
                        ],
                    }));
                } else {
                    doWithBase64StringFile(base64StringFile);
                    setInformativePanelsState((prev) => ({
                        ...prev,
                        values: prev.values.map((value) => {
                            if (value.name === informativePanel.name)
                                return {
                                    ...value,
                                    isSuccess: {
                                        ...value.isSuccess,
                                        value: true,
                                    },
                                    isFailure: {
                                        ...value.isFailure,
                                        value: false,
                                    },
                                    isUploading: {
                                        ...value.isUploading,
                                        value: false,
                                    },
                                };
                            return value;
                        }),
                        makeItDisappear: [
                            ...prev.makeItDisappear,
                            informativePanel.name,
                        ],
                    }));
                }
            }
        },
        [
            informativePanelsState.values,
            isTestIsFailure,
            doWithBase64StringFile,
        ],
    );

    // start workers after files have been droped and array of values (informative panels)
    // are loaded
    useEffect(() => {
        if (informativePanelsState.startWorkers.length) {
            informativePanelsState.startWorkers.forEach((name) => {
                const informativePanel = informativePanelsState.values.find(
                    (value) => value.name === name,
                );
                if (informativePanel) {
                    informativePanel.worker.onmessage = onWorkerMessage;
                    informativePanel.worker.postMessage({
                        file: informativePanel.file,
                    });
                }
            });
            setInformativePanelsState((prev) => ({
                ...prev,
                startWorkers: [],
            }));
        }
    }, [informativePanelsState.startWorkers.length, onWorkerMessage]);

    // make disappear values (informative panels) in the future
    useEffect(() => {
        if (informativePanelsState.makeItDisappear.length) {
            informativePanelsState.makeItDisappear.forEach((name) => {
                setTimeout(() => {
                    if (isMounted.current) {
                        setInformativePanelsState((prev) => ({
                            ...prev,
                            values: prev.values.filter((value) => {
                                if (value.name === name) {
                                    value.worker.terminate();
                                    return false;
                                }
                                return true;
                            }),
                            makeItDisappear: prev.makeItDisappear.filter(
                                (name_) => name_ !== name,
                            ),
                        }));
                    }
                }, messageDuration);
            });
        }
    }, [informativePanelsState.makeItDisappear.length]);

    const onDragEnter = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        dispatch({ type: SET_IS_DRAG_ENTER, value: true });
    }, []);

    const onDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        dispatch({ type: SET_IS_DRAG_ENTER, value: false });
    }, []);

    const { getRootProps, getInputProps, rootRef } = useDropzone({
        onDrop,
        onDragEnter,
        onDragLeave,
        disabled: isDisabled,
    });

    // calculate (set) some values after the first render
    // useEffect(() => {
    //     if (containerRef.current?.scrollHeight) {
    //         const innerContentHeight =
    //             containerRef.current.scrollHeight - PADDING * 2;
    //         console.log('set initial height values');
    //         dispatch({
    //             type: SET_INITIAL_HEIGHT_VALUES,
    //             value: innerContentHeight,
    //         });
    //     }
    //     if (rootRef.current?.clientWidth) {
    //         const innerComponentWidth =
    //             rootRef.current.clientWidth - MARGIN * 2 - PADDING * 2;
    //         dispatch({ type: SET_COMPONENT_WIDTH, value: innerComponentWidth });
    //     }
    // }, []);

    // useEffect(() => {
    //     // set some values the first time when the component it's expanded
    //     if (
    //         state.height === undefined &&
    //         (isUploading.reduce((acc,value)=>acc||value,false) || isSuccess.reduce((acc,value)=>acc||value,false) || isFailure.reduce((acc,value)=>acc||value,false))
    //     ) {
    //         console.log('set total height plus')
    //         if (containerRef.current?.scrollHeight) {
    //             dispatch({
    //                 type: SET_TOTAL_HEIGHT_PLUS,
    //                 value: containerRef.current.scrollHeight - PADDING * 2,
    //             });
    //         }
    //         if (loadingContainerRef.current?.getBoundingClientRect().top) {
    //             dispatch({
    //                 type: SET_POSITION_TOP_LOADING,
    //                 value:
    //                     loadingContainerRef.current.getBoundingClientRect()
    //                         .top - MARGIN,
    //             });
    //         }
    //     }
    //     // calculate and set the width of the success and failure container component
    //     if (isSuccess.reduce((acc,value)=>acc||value,false) || isFailure.reduce((acc,value)=>acc||value,false) ) {
    //         const width = containerRef.current?.getBoundingClientRect().width;
    //         if (width) {
    //             dispatch({
    //                 type: SET_IS_SUCCESS_WIDTH,
    //                 value: width - PADDING * 2 - MARGIN * 2,
    //             });
    //         }
    //     }
    //     // sets height of the component, is used to transition between heights.
    //     if (isUploading.reduce((acc,value)=>acc||value,false)  || isSuccess.reduce((acc,value)=>acc||value,false)  || isFailure.reduce((acc,value)=>acc||value,false) ) {
    //         console.log('setting totalheightplus or initial height plus values');
    //         if (state.totalHeightPlus) {
    //             dispatch({ type: SET_HEIGHT, value: state.totalHeightPlus });
    //         } else {
    //             dispatch({ type: SET_INITIAL_HEIGHT_PLUS_VALUES });
    //         }
    //     } else if (state.totalHeight) {
    //         dispatch({ type: SET_HEIGHT, value: state.totalHeight });
    //     }
    //     // calculate and set isUploading container panel.
    //     if (
    //         isUploading.reduce((acc,value)=>acc||value,false)  &&
    //         !isFailure.reduce((acc,value)=>acc||value,false)  &&
    //         !isSuccess.reduce((acc,value)=>acc||value,false)  &&
    //         loadingContainerRef.current?.scrollHeight
    //     ) {
    //         console.log('setting loading container height');
    //         const loadingContainerHeight =
    //             loadingContainerRef.current.scrollHeight;
    //         dispatch({
    //             type: SET_LOADING_CONTAINER_HEIGHT,
    //             value: loadingContainerHeight,
    //         });
    //     }
    // }, [
    //     state.height,
    //     isUploading,
    //     isSuccess,
    //     isFailure,
    //     state.totalHeight,
    //     state.totalHeightPlus,
    // ]);

    // useEffect(() => {
    //     isUploading.forEach((value,index)=>{
    //         if(!value){
    //             dispatch({ type: SET_OPACITY_LOADING, value: 0,index });
    //         }
    //     })
    //     return () => {
    //         isUploading.forEach((_,index)=>{
    //             dispatch({ type: LOADING_RESTORE,index });
    //         })
    //     };
    // }, [isUploading]);

    // useEffect(() => {
    //     isFailure.forEach((value,index)=>{
    //         if(!value){
    //             dispatch({ type: SET_OPACITY_IS_FAILURE, value: 0,index });
    //         }
    //     })
    //     return () => {
    //         isFailure.forEach((_,index)=>{
    //             dispatch({ type: IS_FAILURE_RESTORE,index });
    //         })
    //     };
    // }, [isFailure]);

    // useEffect(() => {
    //     isSuccess.forEach((value,index)=>{
    //         if(!value){
    //             dispatch({ type: SET_OPACITY_IS_SUCCESS, value: 0,index });
    //         }
    //     })
    //     return () => {
    //         isFailure.forEach((_,index)=>{
    //             dispatch({ type: IS_SUCCESS_RESTORE,index });
    //         })
    //     };
    // }, [isSuccess]);

    // resize bottom panel width when resizing window browser
    // useLayoutEffect(() => {
    //     function updateSize() {
    //         if (rootRef.current?.clientWidth) {
    //             const innerComponentWidth =
    //                 rootRef.current.clientWidth - MARGIN * 2 - PADDING * 2;
    //             dispatch({
    //                 type: SET_COMPONENT_WIDTH,
    //                 value: innerComponentWidth,
    //             });
    //         }
    //         if (isSuccess || isFailure) {
    //             const width =
    //                 containerRef.current?.getBoundingClientRect().width;
    //             if (width) {
    //                 dispatch({
    //                     type: SET_IS_SUCCESS_WIDTH,
    //                     value: width - PADDING * 2 - MARGIN * 2,
    //                 });
    //             }
    //         }
    //     }
    //     window.addEventListener('resize', updateSize);
    //     updateSize();
    //     return () => window.removeEventListener('resize', updateSize);
    // }, [isSuccess, isFailure]);

    /** renders isSuccess panel, or isFailure panel, or isUploading panel, depending
     * on the state of the informative panel
     */
    const renderBottomPanelContent = useCallback(
        (value: IValue): React.ReactElement | undefined => {
            let isFailureIsSuccessPanelProps: IIsFailureIsSuccessPanelProps | null =
                null;
            if (value.isFailure.value) {
                isFailureIsSuccessPanelProps = {
                    message: failureMessage,
                    iconColor: MainTheme.colors.statusColors.red,
                    IconToShow: TimesCircle,
                    heightAndOpacityTransitionDuration,
                };
            }
            if (value.isSuccess.value) {
                isFailureIsSuccessPanelProps = {
                    message: successMessage,
                    iconColor: MainTheme.colors.statusColors.green,
                    IconToShow: CheckCircle,
                    heightAndOpacityTransitionDuration,
                };
            }
            if (isFailureIsSuccessPanelProps) {
                return (
                    <IsFailureIsSuccessPanel
                        {...isFailureIsSuccessPanelProps}
                    />
                );
            }
            if (value.isUploading.value) {
                return (
                    <Loading
                        loading={value.isUploading.value}
                        message={`Uploading ${value.name}`}
                    />
                );
            }
            return undefined;
        },
        [],
    );

    /** cancel uploading; terminate worker and remove informative panel */
    const onCancelUploading = (informativePanel: IValue) => () => {
        setInformativePanelsState((prev) => ({
            ...prev,
            values: prev.values.filter((value) => {
                if (value.name === informativePanel.name) {
                    value.worker.terminate();
                    return false;
                }
                return true;
            }),
        }));
    };

    return (
        <Container
            backgroundColor="white"
            padding="10px"
            borderRadius="20px"
            ref={containerRef}
            maxHeight={state.maxHeight}
            overflow="hidden"
            height={state.height}
            margin={`${MARGIN}px`}
            isWidthFitContent
            heightAndOpacityTransitionDuration={heightAndOpacityTransitionDuration}
        >
            <Dropzone multiple>
                {() => (
                    <Container
                        {...getRootProps({
                            dashed: true,
                            withFlexCenter: true,
                            withBorder: !state.isDragEnter,
                            isDragEnter: state.isDragEnter,
                            padding: '10px',
                            margin: `${MARGIN}px`,
                        })}
                        heightAndOpacityTransitionDuration={heightAndOpacityTransitionDuration}
                    >
                        <SubContainer
                            minHeight={minHeight}
                            minWidth={minWidth}
                            disabled={isDisabled ?? false}
                        >
                            {state.isDragEnter ? (
                                <FileMovingAnimation />
                            ) : (
                                <Icon as={Image} width={140} height={80} />
                            )}
                            <TextLayout bold color="DarkBlue">
                                {title}
                            </TextLayout>
                            <TextLayout
                                size="small"
                                bold
                                color="rgba(128,128,128,.8)"
                            >
                                {subTitle}
                            </TextLayout>
                            <input {...getInputProps()} />
                        </SubContainer>
                    </Container>
                )}
            </Dropzone>
            {informativePanelsState.values.map((value, index) => (
                <BottomPanel
                    key={index} //eslint-disable-line
                    isUploading={value.isUploading.value}
                    onCancelUploading={onCancelUploading(value)}
                    withBorder
                    padding={
                        value.isFailure.value || value.isSuccess.value
                            ? undefined
                            : '30px 20px 43px 20px'
                    }
                    opacity={
                        value.isUploading.opacity ||
                        value.isSuccess.opacity ||
                        value.isFailure.opacity
                    }
                    position={
                        value.isUploading.isPosition &&
                        value.isFailure.isPosition &&
                        value.isSuccess.isPosition
                    }
                    ref={loadingContainerRef}
                    overflow="hidden"
                    width={
                        value.isFailure.value || value.isSuccess.value
                            ? state.isSuccessWidth
                            : state.componentWidth
                    }
                    margin={`${MARGIN}px`}
                    positionTop={state.positionTopLoading}
                    height={
                        value.isFailure.value || value.isSuccess.value
                            ? state.loadingContainerHeight
                            : undefined
                    }
                    withFlexSpaceBetween={
                        value.isFailure.value || value.isSuccess.value
                            ? true
                            : undefined
                    }
                    heightAndOpacityTransitionDuration={heightAndOpacityTransitionDuration}
                >
                    {renderBottomPanelContent(value)}
                </BottomPanel>
            ))}
        </Container>
    );
};

interface ISubContainerProps {
    minHeight?: number;
    minWidth?: number;
    disabled: boolean;
}

const SubContainer = styled.div<ISubContainerProps>`
    ${flex('column', 'space-between', 'center')}
    ${({ minHeight, disabled, minWidth }): string => `
${
    minHeight
        ? `
min-height:${minHeight}px;
`
        : ''
}
${
    minWidth
        ? `
min-width:${minWidth}px;
`
        : ''
}
${disabled ? `opacity:0.6;` : ''}
`}
cursor:pointer;
    flex: 1;
`;
