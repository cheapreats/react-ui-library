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
import { useDropzone } from 'react-dropzone';
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

interface IOptions {
    position: boolean;
    opacity: number;
}

interface IState {
    height: number | undefined;
    totalHeight: number;
    totalHeightPlus: number;
    maxHeight: number | undefined;
    loading: IOptions;
    isSuccess: IOptions;
    isFailure: IOptions;
    positionTopLoading: number;
    loadingContainerHeight: number;
    componentWidth: number;
    isSuccessWidth: number;
    isDragEnter: boolean;
}

const MESSAGE_DURATION = 1500;
const MAX_HEIGHT = 9000;
const TRANSITION_HEIGHT_ANIMATION_DURATION = 500;
const FIRST_FILE = 0;

const PADDING = 10;
const MARGIN = 10;

const SET_HEIGHT = 'SET_HEIGHT';
const SET_MAX_HEIGHT = 'SET_MAX_HEIGHT';
const SET_TOTAL_HEIGHT = 'SET_TOTAL_HEIGHT';
const SET_COMPONENT_WIDTH = 'SET_COMPONENT_WIDTH';
const SET_TOTAL_HEIGHT_PLUS = 'SET_TOTAL_HEIGHT_PLUS';
const SET_POSITION_TOP_LOADING = 'SET_POSITION_TOP_LOADING';
const SET_IS_SUCCESS_WIDTH = 'SET_IS_SUCCESS_WIDTH';
const SET_OPACITY_LOADING = 'SET_OPACITY_LOADING';
const SET_POSITION_LOADING = 'SET_POSITION_LOADING';
const SET_OPACITY_IS_SUCCESS = 'SET_OPACITY_IS_SUCCESS';
const SET_POSITION_IS_SUCCESS = 'SET_POSITION_IS_SUCCESS';
const SET_OPACITY_IS_FAILURE = 'SET_OPACITY_IS_FAILURE';
const SET_POSITION_IS_FAILURE = 'SET_POSITION_IS_FAILURE';
const SET_LOADING_CONTAINER_HEIGHT = 'SET_LOADING_CONTAINER_HEIGHT';
const SET_IS_DRAG_ENTER = 'SET_IS_DRAG_ENTER';
const LOADING_FADE_OUT = 'LOADING_FADE_OUT';
const LOADING_RESTORE = 'LOADING_RESTORE';
const IS_SUCCESS_FADE_OUT = 'IS_SUCCESS_FADE_OUT';
const IS_SUCCESS_RESTORE = 'IS_SUCCESS_RESTORE';
const IS_FAILURE_FADE_OUT = 'IS_FAILURE_FADE_OUT';
const IS_FAILURE_RESTORE = 'IS_FAILURE_RESTORE';
const SET_INITIAL_HEIGHT_VALUES = 'SET_INITIAL_HEIGHT_VALUES';
const SET_INITIAL_HEIGHT_PLUS_VALUES = 'SET_INITIAL_HEIGHT_PLUS_VALUES';

type Action =
    | {
          type: 'SET_HEIGHT' | 'SET_MAX_HEIGHT';
          value: number | undefined;
      }
    | {
          type:
              | 'SET_TOTAL_HEIGHT'
              | 'SET_COMPONENT_WIDTH'
              | 'SET_TOTAL_HEIGHT_PLUS'
              | 'SET_POSITION_TOP_LOADING'
              | 'SET_IS_SUCCESS_WIDTH'
              | 'SET_OPACITY_LOADING'
              | 'SET_OPACITY_IS_SUCCESS'
              | 'SET_OPACITY_IS_FAILURE'
              | 'SET_LOADING_CONTAINER_HEIGHT'
              | 'SET_INITIAL_HEIGHT_VALUES';
          value: number;
      }
    | {
          type:
              | 'SET_POSITION_LOADING'
              | 'SET_POSITION_IS_SUCCESS'
              | 'SET_POSITION_IS_FAILURE'
              | 'SET_IS_DRAG_ENTER';
          value: boolean;
      }
    | {
          type:
              | 'LOADING_FADE_OUT'
              | 'LOADING_RESTORE'
              | 'IS_SUCCESS_FADE_OUT'
              | 'IS_SUCCESS_RESTORE'
              | 'IS_FAILURE_FADE_OUT'
              | 'IS_FAILURE_RESTORE'
              | 'SET_INITIAL_HEIGHT_PLUS_VALUES';
      };

const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case SET_HEIGHT:
            return {
                ...state,
                height: action.value,
            };
        case SET_MAX_HEIGHT:
            return {
                ...state,
                maxHeight: action.value,
            };
        case SET_TOTAL_HEIGHT:
            return {
                ...state,
                totalHeight: action.value,
            };
        case SET_COMPONENT_WIDTH:
            return {
                ...state,
                componentWidth: action.value,
            };
        case SET_TOTAL_HEIGHT_PLUS:
            return {
                ...state,
                totalHeightPlus: action.value,
            };
        case SET_POSITION_TOP_LOADING:
            return {
                ...state,
                positionTopLoading: action.value,
            };
        case SET_IS_SUCCESS_WIDTH:
            return {
                ...state,
                isSuccessWidth: action.value,
            };
        case SET_OPACITY_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    opacity: action.value,
                },
            };
        case SET_POSITION_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    position: action.value,
                },
            };
        case SET_OPACITY_IS_SUCCESS:
            return {
                ...state,
                isSuccess: {
                    ...state.isSuccess,
                    opacity: action.value,
                },
            };
        case SET_POSITION_IS_SUCCESS:
            return {
                ...state,
                isSuccess: {
                    ...state.isSuccess,
                    position: action.value,
                },
            };
        case SET_OPACITY_IS_FAILURE:
            return {
                ...state,
                isFailure: {
                    ...state.isFailure,
                    opacity: action.value,
                },
            };
        case SET_POSITION_IS_FAILURE:
            return {
                ...state,
                isFailure: {
                    ...state.isFailure,
                    position: action.value,
                },
            };
        case SET_LOADING_CONTAINER_HEIGHT:
            return {
                ...state,
                loadingContainerHeight: action.value,
            };
        case SET_IS_DRAG_ENTER:
            return {
                ...state,
                isDragEnter: action.value,
            };
        case LOADING_FADE_OUT:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    opacity: 0,
                    position: true,
                },
            };
        case LOADING_RESTORE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    opacity: 1,
                    position: false,
                },
            };
        case IS_SUCCESS_FADE_OUT:
            return {
                ...state,
                isSuccess: {
                    ...state.isSuccess,
                    opacity: 0,
                    position: true,
                },
            };
        case IS_SUCCESS_RESTORE:
            return {
                ...state,
                isSuccess: {
                    ...state.isSuccess,
                    opacity: 1,
                    position: false,
                },
            };
        case IS_FAILURE_FADE_OUT:
            return {
                ...state,
                isFailure: {
                    ...state.isFailure,
                    opacity: 0,
                    position: true,
                },
            };
        case IS_FAILURE_RESTORE:
            return {
                ...state,
                isFailure: {
                    ...state.isFailure,
                    opacity: 1,
                    position: false,
                },
            };
        case SET_INITIAL_HEIGHT_VALUES:
            return {
                ...state,
                maxHeight: action.value,
                totalHeight: action.value,
            };
        case SET_INITIAL_HEIGHT_PLUS_VALUES:
            return {
                ...state,
                height: undefined,
                maxHeight: MAX_HEIGHT,
            };
        default:
            return state;
    }
};

export interface IFileUploadProps {
    title: string;
    subTitle: string;
    minHeight: number;
    minWidth?: number;
    setBase64: (base64StringFile: string) => void;
    isUploading: boolean;
    isSuccess: boolean;
    isFailure: boolean;
    successMessage: string;
    failureMessage: string;
    disabled: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFailure: React.Dispatch<React.SetStateAction<boolean>>;
    messageDuration?: number;
}

export const FileUpload: React.FC<IFileUploadProps> = ({
    title,
    subTitle,
    minHeight,
    minWidth,
    setBase64,
    isUploading,
    isSuccess,
    isFailure,
    successMessage,
    failureMessage,
    disabled,
    setIsUploading,
    setIsSuccess,
    setIsFailure,
    messageDuration = MESSAGE_DURATION,
}): React.ReactElement => {
    const initState: IState = {
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
    const base64StringFileRef = useRef<string>('');
    const previousIsSuccessValue = useRef<boolean>(isSuccess);

    /**
     * this is to execute setBase64 function after the animation finishes
     */
    useEffect(() => {
        if (previousIsSuccessValue.current) {
            setTimeout(() => {
                setBase64(base64StringFileRef.current);
            }, TRANSITION_HEIGHT_ANIMATION_DURATION);
        }
        previousIsSuccessValue.current = isSuccess;
    }, [isSuccess]);

    // this is to calculate (set) some values after the first render
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
        // this is to set some values the first time when the component it's expanded
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
        // this is to calculate and set the width of the success and failure container component
        if (isSuccess || isFailure) {
            const width = containerRef.current?.getBoundingClientRect().width;
            if (width) {
                dispatch({
                    type: SET_IS_SUCCESS_WIDTH,
                    value: width - PADDING * 2 - MARGIN * 2,
                });
            }
        }
        // this sets height of the component, is used to transition between heights.
        if (isUploading || isSuccess || isFailure) {
            if (state.totalHeightPlus) {
                dispatch({ type: SET_HEIGHT, value: state.totalHeightPlus });
            } else {
                dispatch({ type: SET_INITIAL_HEIGHT_PLUS_VALUES });
            }
        } else if (state.totalHeight) {
            dispatch({ type: SET_HEIGHT, value: state.totalHeight });
        }
        // this is to calculate and set isuploading container panel.
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

    // this is used to resize bottom panel with when resizing window browser
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
                const width =
                    containerRef.current?.getBoundingClientRect().width;
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

    const containerRef = useRef<HTMLDivElement>(null);
    const loadingContainerRef = useRef<HTMLDivElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFileName(acceptedFiles[FIRST_FILE].name);
        setIsUploading(true);
        setIsSuccess(false);
        setIsFailure(false);
        acceptedFiles.forEach((file) => {
            const workerInstance = worker();
            workerRef.current = workerInstance;
            workerInstance.onmessage = (e: any) => {
                const { base64StringFile } = e.data;
                if (base64StringFile === NO_BASE64STRINGFILE) {
                    workerRef.current?.terminate();
                    setIsFailure(true);
                    setIsSuccess(false);
                    setIsUploading(false);
                    setTimeout(() => {
                        if (isMounted.current) setIsFailure(false);
                    }, messageDuration);
                } else if (base64StringFile !== undefined) {
                    workerRef.current?.terminate();
                    base64StringFileRef.current = base64StringFile;
                    setIsSuccess(true);
                    setIsFailure(false);
                    setIsUploading(false);
                    setTimeout(() => {
                        if (isMounted.current) {
                            setIsSuccess(false);
                        }
                    }, messageDuration);
                }
            };
            workerInstance.postMessage({ file });
            dispatch({ type: SET_IS_DRAG_ENTER, value: false });
        });
    }, []);
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
        disabled,
    });

    const renderChild = (): React.ReactElement | undefined => {
        if (isFailure) {
            return (
                <IsFailureIsSuccessPanel
                    message={failureMessage}
                    iconColor={MainTheme.colors.statusColors.red}
                    IconToShow={TimesCircle}
                />
            );
        }
        if (isSuccess) {
            return (
                <IsFailureIsSuccessPanel
                    message={successMessage}
                    iconColor={MainTheme.colors.statusColors.green}
                    IconToShow={CheckCircle}
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
        >
            <Container
                {...getRootProps({
                    dashed: true,
                    withFlexCenter: true,
                    withBorder: !state.isDragEnter,
                    isDragEnter: state.isDragEnter,
                    padding: '10px',
                    margin: `${MARGIN}px`,
                })}
            >
                <SubContainer
                    minHeight={minHeight}
                    minWidth={minWidth}
                    disabled={disabled}
                >
                    {state.isDragEnter ? (
                        <FileMovingAnimation />
                    ) : (
                        <Icon as={Image} width={140} height={80} />
                    )}
                    <TextLayout bold color="DarkBlue">
                        {title}
                    </TextLayout>
                    <TextLayout size="small" bold color="rgba(128,128,128,.8)">
                        {subTitle}
                    </TextLayout>
                    <input {...getInputProps()} />
                </SubContainer>
            </Container>
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
            >
                {renderChild()}
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
