import moment from 'moment';
import {
    ICategoryWithHoursTypes,
    ICreateHoursInitalState,
    IErrors,
} from './interfaces';

const FIRST_LETTER_OF_DAY = 0;
const SECOND_LETTER_OF_DAY = 1;

export const DASH_BEWTWEEN_TIME_PERIODS = ` - `;
export const DAYS_OF_THE_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];
export const CATEGORY_FIELD = 'categories';
export const MOMENT_24_HOUR_FORMAT = 'HH:mm';
export const MOMENT_12_HOUR_FORMAT = 'h:mm a';
export const TIME_FRAME_MINUTES = 'minutes';

export const upperCaseFirstLetter = (day: string): string =>
    day.charAt(FIRST_LETTER_OF_DAY).toUpperCase() +
    day.slice(SECOND_LETTER_OF_DAY);

export const validateCreateCategory = (
    values: { createCategory: string },
    categories: ICategoryWithHoursTypes[],
    duplicateErrorMessage: string,
    emptyErrorMessage: string,
): IErrors => {
    const errors: IErrors = {};
    const categoryNames = categories.map(({ name }) => name);
    const isCategoryDuplicate = categoryNames.find(
        (name) => name === values.createCategory,
    );
    if (isCategoryDuplicate) {
        errors.createCategory = duplicateErrorMessage;
    } else if (!values.createCategory) {
        errors.createCategory = emptyErrorMessage;
    }
    return errors;
};

export const validateToFromTime = (
    values: ICreateHoursInitalState,
    fromTimeToBig: string,
    toTimeToSmall: string,
): IErrors => {
    const errors: IErrors = {};
    if (
        moment(values.storeHours.from, MOMENT_24_HOUR_FORMAT).isAfter(
            moment(values.storeHours.to, MOMENT_24_HOUR_FORMAT),
            TIME_FRAME_MINUTES,
        )
    ) {
        errors.from = fromTimeToBig;
    }
    if (
        moment(values.storeHours.to, MOMENT_24_HOUR_FORMAT).isBefore(
            moment(values.storeHours.from, MOMENT_24_HOUR_FORMAT),
            TIME_FRAME_MINUTES,
        )
    ) {
        errors.to = toTimeToSmall;
    }
    return errors;
};

/**
 * Creates a store hours schedule with a new category
 * @param {string} categoryName - Name of category user creates
 * @returns {ICategoryWithHoursTypes}
 */
export const createCategoryWithHours = (
    categoryName: string,
): ICategoryWithHoursTypes => {
    const oneCategoryWithHours: ICategoryWithHoursTypes = {
        name: categoryName,
        open_hours: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        },
    };
    return oneCategoryWithHours;
};

/**
 * Toggles between 24 hours and 12 hour time (AM/PM)
 * @param {string} date - date to be converted
 * @param {is24Hours} boolean
 * @returns {React.ReactElement | null} -
 */
export const convertTime = (date: string, is24Hours: boolean): string => {
    let convertedDate = moment(date, MOMENT_24_HOUR_FORMAT).format(
        MOMENT_12_HOUR_FORMAT,
    );
    if (is24Hours) {
        convertedDate = moment(date, MOMENT_24_HOUR_FORMAT).format(
            MOMENT_24_HOUR_FORMAT,
        );
    }
    return convertedDate;
};

export const isAfterMoment = (
    initialTime: string,
    compareTime: string,
): boolean =>
    moment(initialTime, MOMENT_24_HOUR_FORMAT).isAfter(
        moment(compareTime, MOMENT_24_HOUR_FORMAT),
        TIME_FRAME_MINUTES,
    );
export const isBeforeMoment = (
    initialTime: string,
    compareTime: string,
): boolean =>
    moment(initialTime, MOMENT_24_HOUR_FORMAT).isBefore(
        moment(compareTime, MOMENT_24_HOUR_FORMAT),
        TIME_FRAME_MINUTES,
    );
export const isSameMoment = (
    initialTime: string,
    compareTime: string,
): boolean =>
    moment(initialTime, MOMENT_24_HOUR_FORMAT).isSame(
        moment(compareTime, MOMENT_24_HOUR_FORMAT),
        TIME_FRAME_MINUTES,
    );
