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
} from './reducer';

const MESSAGE_DURATION = 1500;
const SUCCESS_MESSAGE = 'Completed';
const FAILURE_MESSAGE = 'Something went wrong';
const TITLE = 'Drop your files here, or click to browse';
const SUBTITLE = 'Admits any kind of files';
const TRANSITION_HEIGHT_ANIMATION_DURATION = 200;
const FIRST_FILE = 0;
const ONLY_ONE_FILE=1;

const PADDING = 10;
const MARGIN = 10;

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
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const initState: IFileUploadState = {
        height: undefined,
        totalHeight: 0,
        totalHeightPlus: 0,
        maxHeight: undefined,
        loading: { position: !isUploading, opacity: 0 },
        isSuccess: { position: !isSuccess, opacity: 0 },
        isFailure: { position: !isFailure, opacity: 0 },
        positionTopLoading: 0,
        loadingContainerHeight: 0,
        componentWidth: 0,
        isSuccessWidth: 0,
        isDragEnter: false,
    };
    const [state, dispatch] = useReducer(reducer, initState);
    const isMounted = useMounted();
    const [fileName, setFileName] = useState<string>('');

    const workerRef = useRef<Worker>();
    /**
     * ref to the most outer container, which contains everything else
     */
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingContainerRef = useRef<HTMLDivElement>(null);

    /**
     * recursive function; reads files sequentially;
     */
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[FIRST_FILE];
            setFileName(file.name);
            setIsUploading(true);
            setIsSuccess(false);
            setIsFailure(false);
            const workerInstance = worker();
            workerRef.current = workerInstance;
            workerInstance.onmessage = (e: any) => {
                const { base64StringFile } = e.data;
                if(base64StringFile===undefined){
                    return
                }
                if (
                    base64StringFile === NO_BASE64STRINGFILE ||
                    isTestIsFailure
                ) {
                    workerRef.current?.terminate();
                    setIsFailure(true);
                    setIsSuccess(false);
                    setIsUploading(false);
                    setTimeout(() => {
                        if (isMounted.current) setIsFailure(false);
                    }, messageDuration);
                } else if (base64StringFile !== undefined) {
                    workerRef.current?.terminate();
                    doWithBase64StringFile(base64StringFile);
                    setIsSuccess(true);
                    setIsFailure(false);
                    setIsUploading(false);
                    setTimeout(() => {
                        if (isMounted.current) {
                            setIsSuccess(false);
                            if(acceptedFiles.length>ONLY_ONE_FILE){
                                onDrop(acceptedFiles.slice(1));
                            }
                        }
                    }, messageDuration);
                }
            };
            workerInstance.postMessage({ file });
            dispatch({ type: SET_IS_DRAG_ENTER, value: false });
        },
        [isTestIsFailure],
    );

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
    useEffect(() => {
        if (containerRef.current?.scrollHeight) {
            const innerContentHeight =
                containerRef.current.scrollHeight - PADDING * 2;
            dispatch({
                type: SET_INITIAL_HEIGHT_VALUES,
                value: innerContentHeight,
            });
        }
        if (rootRef.current?.clientWidth) {
            const innerComponentWidth =
                rootRef.current.clientWidth - MARGIN * 2 - PADDING * 2;
            dispatch({ type: SET_COMPONENT_WIDTH, value: innerComponentWidth });
        }
    }, []);

    useEffect(() => {
        // set some values the first time when the component it's expanded
        if (
            state.height === undefined &&
            (isUploading || isSuccess || isFailure)
        ) {
            if (containerRef.current?.scrollHeight) {
                dispatch({
                    type: SET_TOTAL_HEIGHT_PLUS,
                    value: containerRef.current.scrollHeight - PADDING * 2,
                });
            }
            if (loadingContainerRef.current?.getBoundingClientRect().top) {
                dispatch({
                    type: SET_POSITION_TOP_LOADING,
                    value:
                        loadingContainerRef.current.getBoundingClientRect()
                            .top - MARGIN,
                });
            }
        }
        // calculate and set the width of the success and failure container component
        if (isSuccess || isFailure) {
            const width = containerRef.current?.getBoundingClientRect().width;
            if (width) {
                dispatch({
                    type: SET_IS_SUCCESS_WIDTH,
                    value: width - PADDING * 2 - MARGIN * 2,
                });
            }
        }
        // sets height of the component, is used to transition between heights.
        if (isUploading || isSuccess || isFailure) {
            if (state.totalHeightPlus) {
                dispatch({ type: SET_HEIGHT, value: state.totalHeightPlus });
            } else {
                dispatch({ type: SET_INITIAL_HEIGHT_PLUS_VALUES });
            }
        } else if (state.totalHeight) {
            dispatch({ type: SET_HEIGHT, value: state.totalHeight });
        }
        // calculate and set isUploading container panel.
        if (
            isUploading &&
            !isFailure &&
            !isSuccess &&
            loadingContainerRef.current?.scrollHeight
        ) {
            const loadingContainerHeight =
                loadingContainerRef.current.scrollHeight;
            dispatch({
                type: SET_LOADING_CONTAINER_HEIGHT,
                value: loadingContainerHeight,
            });
        }
    }, [
        state.height,
        isUploading,
        isSuccess,
        isFailure,
        state.totalHeight,
        state.totalHeightPlus,
    ]);

    useEffect(() => {
        if (!isUploading) {
            dispatch({ type: SET_OPACITY_LOADING, value: 0 });
        }
        return () => {
            dispatch({ type: LOADING_RESTORE });
        };
    }, [isUploading]);

    useEffect(() => {
        if (!isFailure) {
            dispatch({ type: SET_OPACITY_IS_FAILURE, value: 0 });
        }
        return () => {
            dispatch({ type: IS_FAILURE_RESTORE });
        };
    }, [isFailure]);

    useEffect(() => {
        if (!isSuccess) {
            dispatch({ type: SET_OPACITY_IS_SUCCESS, value: 0 });
        }
        return () => {
            dispatch({ type: IS_SUCCESS_RESTORE });
        };
    }, [isSuccess]);

    // resize bottom panel width when resizing window browser
    useLayoutEffect(() => {
        function updateSize() {
            if (rootRef.current?.clientWidth) {
                const innerComponentWidth =
                    rootRef.current.clientWidth - MARGIN * 2 - PADDING * 2;
                dispatch({
                    type: SET_COMPONENT_WIDTH,
                    value: innerComponentWidth,
                });
            }
            if (isSuccess || isFailure) {
                const width = containerRef.current?.getBoundingClientRect()
                    .width;
                if (width) {
                    dispatch({
                        type: SET_IS_SUCCESS_WIDTH,
                        value: width - PADDING * 2 - MARGIN * 2,
                    });
                }
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [isSuccess, isFailure]);

    const renderBottomPanelContent = (): React.ReactElement | undefined => {
        if (isFailure) {
            return (
                <IsFailureIsSuccessPanel
                    message={failureMessage}
                    iconColor={MainTheme.colors.statusColors.red}
                    IconToShow={TimesCircle}
                    transitionDuration={animationDuration}
                />
            );
        }
        if (isSuccess) {
            return (
                <IsFailureIsSuccessPanel
                    message={successMessage}
                    iconColor={MainTheme.colors.statusColors.green}
                    IconToShow={CheckCircle}
                    transitionDuration={animationDuration}
                />
            );
        }
        if (isUploading) {
            return (
                <Loading
                    loading={isUploading}
                    message={`Uploading ${fileName}`}
                />
            );
        }
        return undefined;
    };

    const onCancelUploading = () => {
        if (workerRef.current) {
            workerRef.current.terminate();
            setIsUploading(false);
        }
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
            <BottomPanel
                isUploading={isUploading}
                onCancelUploading={onCancelUploading}
                withBorder
                padding={
                    isFailure || isSuccess ? undefined : '30px 20px 43px 20px'
                }
                opacity={
                    state.loading.opacity ||
                    state.isSuccess.opacity ||
                    state.isFailure.opacity
                }
                position={
                    state.loading.position &&
                    state.isFailure.position &&
                    state.isSuccess.position
                }
                ref={loadingContainerRef}
                overflow="hidden"
                width={
                    isFailure || isSuccess
                        ? state.isSuccessWidth
                        : state.componentWidth
                }
                margin={`${MARGIN}px`}
                positionTop={state.positionTopLoading}
                height={
                    isFailure || isSuccess
                        ? state.loadingContainerHeight
                        : undefined
                }
                withFlexSpaceBetween={isFailure || isSuccess ? true : undefined}
                transitionDuration={animationDuration}
            >
                {renderBottomPanelContent()}
            </BottomPanel>
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
