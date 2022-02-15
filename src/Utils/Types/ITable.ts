import {IChair} from "@Containers";

export type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';

export type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

export interface ITable {
    /**
     * The shape for the ISquareTable ("Square", "HorizontalRectangle", "VerticalRectangle")
     */
    tableShape: 'Square' | 'HorizontalRectangle' | 'VerticalRectangle' | 'Circle' | 'Oval';
    /**
     * The unique identifier for the table (Table Name)
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * Timer for the last time that table was served
     * format: Hours:Minutes:Seconds
     */
    timeLastServed: string;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: () => void;
}