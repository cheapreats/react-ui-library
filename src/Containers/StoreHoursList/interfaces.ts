export interface ITextHeaders {
    TITLES: {
        HEADING: string,
        FIRST_MODAL_HEADER: string,
        SECOND_MODAL_HEADER: string,
        THIRD_MODAL_HEADER: string,
        OPERATIONS: string,
        CHANGE_ACTIVE: string,
        CHANGE_ACTIVE_SUBTILTE:
        string,
        SELECT_A_DAY: string,
        SELECT_A_CATEGORY: string,
        ALL_CATEGORIES: string,
        ALL_CATEGORIES_SUBTITLE:
        string,
        CONFIRM_DELETE: string,
        CHANGE_ACTIVE_SUBTITLE: string,
        RESET_FORM: string
    },
    BUTTONS: {
        EDIT: string,
        TOGGLE: string,
        ADD_HOURS: string,
        EDIT_CATEGORIES: string,
        ADD_CATEGORY: string,
        SET_ACTIVE: string,
        YES: string,
        NO: string,
    },
    ERRORS: {
        CANNOT_DELETE_ACTIVE_CATEGORY: string,
        ONLY_ONE_TIME: string,
        FROM_TIME_TOO_BIG: string,
        TO_TIME_TOO_SMALL: string,
        CANNOT_ADD_EMPTY: string,
        CATEGORY_EXISTS: string,
    }
}