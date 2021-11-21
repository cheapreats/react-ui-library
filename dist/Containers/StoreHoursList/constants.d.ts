import { ICategoryWithHoursTypes, ICreateHoursInitalState, IErrors } from './interfaces';
export declare const DASH_BEWTWEEN_TIME_PERIODS = " - ";
export declare const DAYS_OF_THE_WEEK: string[];
export declare const CATEGORY_FIELD = "categories";
export declare const MOMENT_24_HOUR_FORMAT = "HH:mm";
export declare const MOMENT_12_HOUR_FORMAT = "h:mm a";
export declare const TIME_FRAME_MINUTES = "minutes";
export declare const upperCaseFirstLetter: (day: string) => string;
export declare const validateCreateCategory: (values: {
    createCategory: string;
}, categories: ICategoryWithHoursTypes[], duplicateErrorMessage: string, emptyErrorMessage: string) => IErrors;
export declare const validateToFromTime: (values: ICreateHoursInitalState, fromTimeToBig: string, toTimeToSmall: string) => IErrors;
/**
 * Creates a store hours schedule with a new category
 * @param {string} categoryName - Name of category user creates
 * @returns {ICategoryWithHoursTypes}
 */
export declare const createCategoryWithHours: (categoryName: string) => ICategoryWithHoursTypes;
/**
 * Toggles between 24 hours and 12 hour time (AM/PM)
 * @param {string} date - date to be converted
 * @param {is24Hours} boolean
 * @returns {React.ReactElement | null} -
 */
export declare const convertTime: (date: string, is24Hours: boolean) => string;
export declare const isAfterMoment: (initialTime: string, compareTime: string) => boolean;
export declare const isBeforeMoment: (initialTime: string, compareTime: string) => boolean;
export declare const isSameMoment: (initialTime: string, compareTime: string) => boolean;
