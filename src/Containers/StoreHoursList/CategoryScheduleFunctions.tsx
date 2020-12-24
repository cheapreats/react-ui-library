import { ICategoryWithHoursTypes } from './types';

const FIRST_CATEGORY = 0;

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
        },
        isActive: false,
    };
    return oneCategoryWithHours;
};

/**
 * Finds the active category schedulebased on the isActive boolean value
 * @param {ICategoryWithHoursTypesp[]} categoryName - All schedules
 * @returns {ICategoryWithHoursTypes}
 */
export const findActive = (
    categorySchedules: ICategoryWithHoursTypes[],
): ICategoryWithHoursTypes => {
    const activeCategorySchedule = categorySchedules.find(
        (
            categorySchedule: ICategoryWithHoursTypes,
        ): ICategoryWithHoursTypes | null | boolean =>
            categorySchedule.isActive,
    );
    if (activeCategorySchedule !== undefined) {
        return activeCategorySchedule;
    }
    return categorySchedules[FIRST_CATEGORY];
};
