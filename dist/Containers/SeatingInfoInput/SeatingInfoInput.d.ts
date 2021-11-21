import React from 'react';
import { IDraggableTable } from "../EditDraggableCanvas/_DraggableTable";
declare type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
export interface ISeatingInfoInput {
    /**
     * The array of occupancyStatus types
     */
    occupancyStatusList: Array<occupancyStatusTypes>;
    /**
     * The array of seatingInfoTypes
     */
    availableSeatingInfo: Array<IDraggableTable>;
    /**
     * The array of all room names
     */
    allRooms: Array<string>;
    /**
     * Function to handle onClick event for the button with the FaChair icon
     */
    onSeatCustomerClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaRegClock icon
     */
    onAddToWaitListClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaRegTimesCircle icon
     */
    onEndReservationClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaXIcon icon
     */
    onBackButtonClick: () => void;
    /**
     * Function the will handle the onClick event that handles the focus on table
     * @param arg0 The table information selected
     */
    onSelectCustomerClick: (arg0: IDraggableTable) => void;
}
/**
 * Primary UI component for user interaction
 * SeatingInfoInput
 */
export declare const SeatingInfoInput: React.FC<ISeatingInfoInput>;
export default SeatingInfoInput;
