import React from 'react';
export interface IPartyInfoInput {
    /**
     * Function to handle onClick event for the Next button
     */
    onNextClick: (arg0: string, arg1: number, arg2: string, arg3: string) => void;
    /**
     * Function to handle onClick event for the x button
     */
    onBackButtonClick: () => void;
}
/**
 * Primary UI component for user interaction
 * PartyInfoInput
 */
export declare const PartyInfoInput: React.FC<IPartyInfoInput>;
export default PartyInfoInput;
