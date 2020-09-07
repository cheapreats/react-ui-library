interface DICT {
    [key: string]: {
        [key: string]: string; 
    };
}

interface DICTINDEXES {
    [key: string]: number
};

export const constants: DICT = { 
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

export const index: DICTINDEXES = {
    FIRST_CATEGORY: 0,
};

export interface CategoryWithHoursTypes {
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

export const sampleCategories: CategoryWithHoursTypes [] = [
    {
        category: 'Winter',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    },
    {
        category: 'Summer',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        } 
    },
    {
        category: 'Holidays',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    }
];

export const sampleActiveCategorySchedule: CategoryWithHoursTypes = {
    category: 'Winter',
    hoursByDay: {
        monday: [                    
            {
                from: '12:00',
                to: '20:00'
            }],
        tuesday: [], 
        wednesday: [], 
        thursday: [
            {
                from: '12:00',
                to: '20:00'
            }
        ], 
        friday: [], 
        saturday: [], 
        sunday: [] 
    }
};