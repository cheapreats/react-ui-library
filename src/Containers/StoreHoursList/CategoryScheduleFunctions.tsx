import { ICategoryWithHoursTypes } from './constants';

/**
 * Creates a store hours schedule with a new category
 * @param {string} categoryName - Name of category user creates
 * @returns {ICategoryWithHoursTypes}
 */
export const createCategoryWithHours = (
    categoryName: string,
): ICategoryWithHoursTypes => {
    const oneCategoryWithHours: ICategoryWithHoursTypes = {
        category: categoryName,
        hoursByDay: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }
    };
    return oneCategoryWithHours;
};