const MAX_HEIGHT = 9000;

interface IOptions {
    position: boolean;
    opacity: number;
}

export interface IFileUploadState {
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

export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_MAX_HEIGHT = 'SET_MAX_HEIGHT';
export const SET_TOTAL_HEIGHT = 'SET_TOTAL_HEIGHT';
export const SET_COMPONENT_WIDTH = 'SET_COMPONENT_WIDTH';
export const SET_TOTAL_HEIGHT_PLUS = 'SET_TOTAL_HEIGHT_PLUS';
export const SET_POSITION_TOP_LOADING = 'SET_POSITION_TOP_LOADING';
export const SET_IS_SUCCESS_WIDTH = 'SET_IS_SUCCESS_WIDTH';
export const SET_OPACITY_LOADING = 'SET_OPACITY_LOADING';
export const SET_POSITION_LOADING = 'SET_POSITION_LOADING';
export const SET_OPACITY_IS_SUCCESS = 'SET_OPACITY_IS_SUCCESS';
export const SET_POSITION_IS_SUCCESS = 'SET_POSITION_IS_SUCCESS';
export const SET_OPACITY_IS_FAILURE = 'SET_OPACITY_IS_FAILURE';
export const SET_POSITION_IS_FAILURE = 'SET_POSITION_IS_FAILURE';
export const SET_LOADING_CONTAINER_HEIGHT = 'SET_LOADING_CONTAINER_HEIGHT';
export const SET_IS_DRAG_ENTER = 'SET_IS_DRAG_ENTER';
export const LOADING_FADE_OUT = 'LOADING_FADE_OUT';
export const LOADING_RESTORE = 'LOADING_RESTORE';
export const IS_SUCCESS_FADE_OUT = 'IS_SUCCESS_FADE_OUT';
export const IS_SUCCESS_RESTORE = 'IS_SUCCESS_RESTORE';
export const IS_FAILURE_FADE_OUT = 'IS_FAILURE_FADE_OUT';
export const IS_FAILURE_RESTORE = 'IS_FAILURE_RESTORE';
export const SET_INITIAL_HEIGHT_VALUES = 'SET_INITIAL_HEIGHT_VALUES';
export const SET_INITIAL_HEIGHT_PLUS_VALUES = 'SET_INITIAL_HEIGHT_PLUS_VALUES';

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

const reducer = (state: IFileUploadState, action: Action): IFileUploadState => {
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

export default reducer;
