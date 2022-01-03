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
import { IsFailureIsSuccessPanel } from './IsFailureIsSuccessPanel';
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

const MESSAGE_DURATION = 1500;
const SUCCESS_MESSAGE = 'Completed';
const FAILURE_MESSAGE = 'Something went wrong';
const TITLE = 'Drop your files here, or click to browse';
const SUBTITLE = 'Admits any kind of files';
const TRANSITION_HEIGHT_ANIMATION_DURATION = 200;

const PADDING = 10;
const MARGIN = 10;

interface ISpecificValues {
    value: boolean;
    opacity: number;
    isPosition: boolean;
}

interface IValue {
    isSuccess: ISpecificValues;
    isFailure: ISpecificValues;
    isUploading: ISpecificValues;
    name: string;
    worker: Worker;
    file: File;
}

interface IInformativePanelsState {
    values: IValue[];
    /** index affected */
    index: number;
    name: string;
    makeItDisappear: boolean;
    startWorkers: boolean;
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
    animationDuration?: number;
}

/** multiple file upload */
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
    animationDuration = TRANSITION_HEIGHT_ANIMATION_DURATION,
}): React.ReactElement => {
    const [informativePanelsState, setInformativePanelsState] =
        useState<IInformativePanelsState>({
            values: [],
            index: -1,
            makeItDisappear: false,
            startWorkers: false,
            name: '',
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

    const workerRef = useRef<Worker[]>([]);
    /**
     * ref to the most outer container, which contains everything else
     */
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingContainerRef = useRef<HTMLDivElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const valuesToAdd: IValue[] = [];
        acceptedFiles.forEach((file) => {
            const workerInstance = worker();
            valuesToAdd.push({
                isSuccess: { value: false, isPosition: false, opacity: 1 },
                isFailure: { value: false, isPosition: false, opacity: 1 },
                isUploading: { value: true, isPosition: false, opacity: 1 },
                name: file.name,
                worker: workerInstance,
                file,
            });
        });
        setInformativePanelsState((prev) => ({
            ...prev,
            values: [...prev.values, ...valuesToAdd],
            index: -1,
            startWorkers: true,
        }));
        dispatch({ type: SET_IS_DRAG_ENTER, value: false });
    }, []);

    const onWorkerMessage = useCallback(
        (e: any) => {
            const { base64StringFile, name } = e.data;
            if (base64StringFile === undefined) {
                return;
            }
            if (base64StringFile === NO_BASE64STRINGFILE || isTestIsFailure) {
                const value = informativePanelsState.values.find(
                    (value_) => value_.name === name,
                );
                if (value) {
                    value.worker.terminate();
                    setInformativePanelsState((prev) => ({
                        ...prev,
                        values: prev.values.map((value_) => {
                            if (value_.name === value.name)
                                return {
                                    ...value_,
                                    isSuccess: {
                                        ...value_.isSuccess,
                                        value: false,
                                    },
                                    isFailure: {
                                        ...value_.isFailure,
                                        value: true,
                                    },
                                    isUploading: {
                                        ...value_.isUploading,
                                        value: false,
                                    },
                                };
                            return value_;
                        }),
                    }));
                    setTimeout(() => {
                        if (isMounted.current) {
                            setInformativePanelsState((prev) => ({
                                ...prev,
                                values: prev.values.map((value_) => {
                                    if (value_.name === value.name)
                                        return {
                                            ...value_,
                                            isSuccess: {
                                                ...value_.isSuccess,
                                                value: false,
                                            },
                                            isFailure: {
                                                ...value_.isFailure,
                                                value: false,
                                            },
                                            isUploading: {
                                                ...value_.isUploading,
                                                value: false,
                                            },
                                        };
                                    return value_;
                                }),
                                makeItDisappear: true,
                                name: value.name,
                            }));
                        }
                    }, messageDuration);
                }
            } else {
                const value = informativePanelsState.values.find(
                    (value_) => value_.name === name,
                );
                if (value) {
                    value.worker.terminate();
                    doWithBase64StringFile(base64StringFile);
                    setInformativePanelsState((prev) => ({
                        ...prev,
                        values: prev.values.map((value_) => {
                            if (value_.name === value.name)
                                return {
                                    ...value_,
                                    isSuccess: {
                                        ...value_.isSuccess,
                                        value: true,
                                    },
                                    isFailure: {
                                        ...value_.isFailure,
                                        value: false,
                                    },
                                    isUploading: {
                                        ...value_.isUploading,
                                        value: false,
                                    },
                                };
                            return value_;
                        }),
                    }));
                    setTimeout(() => {
                        if (isMounted.current) {
                            setInformativePanelsState((prev) => ({
                                ...prev,
                                values: prev.values.map((value_) => {
                                    if (value_.name === value.name)
                                        return {
                                            ...value_,
                                            isSuccess: {
                                                ...value_.isSuccess,
                                                value: false,
                                            },
                                            isFailure: {
                                                ...value_.isFailure,
                                                value: false,
                                            },
                                            isUploading: {
                                                ...value_.isUploading,
                                                value: false,
                                            },
                                        };
                                    return value_;
                                }),
                                makeItDisappear: true,
                                name: value.name,
                            }));
                        }
                    }, messageDuration);
                }
            }
        },
        [informativePanelsState.values, isTestIsFailure],
    );

    // start workers when files have been droped
    useEffect(() => {
        if (informativePanelsState.startWorkers) {
            setInformativePanelsState((prev) => ({
                ...prev,
                startWorkers: false,
            }));
            informativePanelsState.values.forEach((value) => {
                value.worker.onmessage = onWorkerMessage;
                value.worker.postMessage({ file: value.file });
            });
        }
    }, [informativePanelsState.startWorkers, isTestIsFailure, onWorkerMessage]);

    // make disappear a value (informative panel)
    useEffect(() => {
        if (informativePanelsState.makeItDisappear) {
            // const indexToRemove = informativePanelsState.index;
            setInformativePanelsState((prev) => ({
                ...prev,
                values: prev.values.filter((value) => {
                    if (value.name === prev.name) return false;
                    return true;
                }),
                index: -1,
                makeItDisappear: false,
                name: '',
            }));
            // dispatch({
            //     type: REMOVE_LOADING_IS_SUCCESS_IS_FAILURE,
            //     index: indexToRemove,
            // });
        }
    }, [informativePanelsState.makeItDisappear]);

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

    const renderBottomPanelContent = useCallback(
        (value: IValue): React.ReactElement | undefined => {
            if (value.isFailure.value) {
                return (
                    <IsFailureIsSuccessPanel
                        message={failureMessage}
                        iconColor={MainTheme.colors.statusColors.red}
                        IconToShow={TimesCircle}
                        transitionDuration={animationDuration}
                    />
                );
            }
            if (value.isSuccess.value) {
                return (
                    <IsFailureIsSuccessPanel
                        message={successMessage}
                        iconColor={MainTheme.colors.statusColors.green}
                        IconToShow={CheckCircle}
                        transitionDuration={animationDuration}
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

    const onCancelUploading = (index: number) => () => {
        workerRef.current[index].terminate();
        setInformativePanelsState((prev) => ({
            ...prev,
            values: prev.values.map((value, index_) => {
                if (index_ === index)
                    return {
                        ...value,
                        isSuccess: { ...value.isSuccess, value: false },
                        isFailure: { ...value.isFailure, value: false },
                        isUploading: { ...value.isUploading, value: false },
                    };
                return value;
            }),
            index,
            makeItDisappear: true,
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
            transitionDuration={animationDuration}
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
                        transitionDuration={animationDuration}
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
                    onCancelUploading={onCancelUploading(index)}
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
                    transitionDuration={animationDuration}
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
