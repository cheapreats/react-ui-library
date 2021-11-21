import React from 'react';
export interface ICapacityDisplay {
    /**
     * Total number of occupied seats
     */
    totalSeatsOccupied: number;
    /**
     * Total number of seats
     */
    totalNumberOfSeats: number;
}
/**
 * Primary UI component for user interaction
 */
export declare const CapacityDisplay: React.FC<ICapacityDisplay>;
