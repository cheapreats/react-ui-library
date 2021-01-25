
const FIRST_LETTER_OF_DAY = 0;
const SECOND_LETTER_OF_DAY = 1;

interface IErrors {
    [key: string]: string;
}

export interface ICategoryWithHoursTypes {
    category: string;
    hoursByDay: IHoursByDay;
}

export interface IToFromHours { 
    to: string; from: string 
}

export interface IHoursByDay {
    monday: IToFromHours[];
    tuesday: IToFromHours[];
    wednesday: IToFromHours[];
    thursday: IToFromHours[];
    friday: IToFromHours[];
    saturday: IToFromHours[];
    sunday: IToFromHours[]; 
}

// Change to use activeCategory and keys since array is awful
export interface ICategoryNew {
    [category: string] : {
        category: string;
        hoursByDay: IHoursByDay
    }
}

export interface ITimeTypes {
    to: Date | string;
    from: Date | string;
}

export interface InitialCheckboxState {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}
export const DAYS_OF_THE_WEEK = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]

export enum MergeActions {
    MERGE = 'Merge',
    REPLACE = 'Replace',
    KEEP = 'Keep'
}

export interface IMergeDays {
    monday: MergeActions;
    tuesday: MergeActions;
    wednesday: MergeActions;
    thursday: MergeActions;
    friday: MergeActions;
    saturday: MergeActions;
    sunday: MergeActions;
}

export const upperCaseFirstLetter = (day: string): string => day.charAt(FIRST_LETTER_OF_DAY).toUpperCase() + day.slice(SECOND_LETTER_OF_DAY);

export const validateCreateCategory = (values: {createCategory: string}, categories: ICategoryWithHoursTypes[], duplicateErrorMessage: string, emptyErrorMessage: string): IErrors => {
    const errors: IErrors = {};
    const categoryNames = categories.map(({category}) => category)
    const isCategoryDuplicate = categoryNames.find(name => name === values.createCategory);
    if (isCategoryDuplicate) {
        errors.createCategory = duplicateErrorMessage
    } else if (!values.createCategory) {
        errors.createCategory = emptyErrorMessage
    }
    return errors
}