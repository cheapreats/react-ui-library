import React from 'react';
export interface IWaitTimeDisplay {
    /**
     * The seating/reservation length of average wait time
     */
    AverageWaitTime: number;
}
/**
 * Primary UI component for user interaction
 * WaitTimeDisplay
 */
export declare const WaitTimeDisplay: React.FC<IWaitTimeDisplay>;
