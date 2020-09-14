const START_INDEX_OF_SELECTION = 0;
const START_INDEX_OF_SELECTION_FOR_DATE = -2;
const END_INDEX_OF_SELECTION_FOR_CONST_D = 2;
const FIRST_HALF_OF_A_DAY_IN_HOURS = 12;
const RADIX_BASE_TEN = 10;

/**
 * Toggles between 24 hours and 12 hour time (AM/PM) 
 * @param {boolean} categoryName - Name of category user creates
 * @returns {React.ReactElement | null} - 
 */
export const convertTime = (date: string, toggle: boolean): string => {
    if (!toggle) {
        const d = parseInt(
            date.slice(
                START_INDEX_OF_SELECTION,
                END_INDEX_OF_SELECTION_FOR_CONST_D,
            ), RADIX_BASE_TEN
        );
        date = `${d % FIRST_HALF_OF_A_DAY_IN_HOURS ||
            FIRST_HALF_OF_A_DAY_IN_HOURS}:${date.slice(
            START_INDEX_OF_SELECTION_FOR_DATE,
        )} ${d < FIRST_HALF_OF_A_DAY_IN_HOURS ? 'AM' : 'PM'}`;
    }
    return date;
};