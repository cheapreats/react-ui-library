interface IDICT {
    [key: string]: {
        [key: string]: string; 
    };
}

interface IDICTINDEXES {
    [key: string]: number
};

export const constants: IDICT = { 
    TITLES: {
        HEADING: 'Hours of Operation Management',
        FIRST_MODAL_HEADER: 'Edit Store Hours and Categories',
        SECOND_MODAL_HEADER: 'Add Store Hours',
        THIRD_MODAL_HEADER: 'Add Categories',
        OPERATIONS: 'Current Hours of Operations for ',
        CHANGE_ACTIVE: 'Change the active category',
        CHANGE_ACTIVE_SUBTILTE: 'This will be the category of times shown to the customers',
        SELECT_A_DAY: 'Select a day',
        SELECT_A_CATEGORY: 'Select a category',
        ALL_CATEGORIES: 'Current Categories',
        ALL_CATEGORIES_SUBTITLE: 'Hover over and click the categories to delete them.'
    },
    BUTTONS: {
        EDIT: 'Edit',
        TOGGLE: 'Toggle AM/PM',
        ADD_HOURS: 'Add Hours',
        EDIT_CATEGORIES: 'Edit Categories',
        ADD_CATEGORY: 'Add Category',
        SET_ACTIVE: 'Set As Active'
    },
    ERRORS: {
        ONE_ACTIVE_CATEGORY: 'You must have at least one category at all times.',
        CANNOT_DELETE_ACTIVE_CATEGORY: 'You cannot delete an active category.',
        ONLY_ONE_TIME: 'You cannot add more than one time per day.'
    },
    SUCCESS: {
        CATEGORY_CREATED: 'Category has been sucessfully created.'
    }
};

export const index: IDICTINDEXES = {
    FIRST_CATEGORY: 0,
};

export interface ICategoryWithHoursTypes {
    category: string,
    hoursByDay: {
        monday: { to: string, from: string }[],
        tuesday: { to: string, from: string }[],
        wednesday: { to: string, from: string }[],
        thursday: { to: string, from: string }[],
        friday: { to: string, from: string }[],
        saturday: { to: string, from: string }[],
        sunday: { to: string, from: string }[]
    }
};
