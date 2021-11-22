/**
 * Rounds amount to the nearest positive integer above 0
 * @param {number} amount - Number to round
 * @returns {number} - Rounded amount above 0
 */
export const positiveRounding = (amount:number): number => (amount >= 1 ? Math.round(amount) : 1);