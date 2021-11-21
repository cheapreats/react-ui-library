import React from 'react';
export interface IEditControlPanel {
    /**
     * The table number for the table
     */
    TableNumber: string;
    /**
     * The number of seats at the table
     */
    NumberOfSeats: number;
    onRemoveChairClick: () => void;
    onAddChairClick: () => void;
    onDeleteClick: () => void;
    onCloneClick: () => void;
    /**
     * The function that will trigger when changing Table number
     * and update the table number on table itself
     */
    onTableNumberChange: (newTableNumber: string) => void;
}
/**
 * Primary UI component for user interaction
 * Edit control panel for the right side of the edit page
 */
export declare const EditControlPanel: React.FC<IEditControlPanel>;
export default EditControlPanel;
