import { IChair } from '@Containers/Chair/Chair';

export type occupancyStatusTypes =
    'Vacant'
    | 'Reserved'
    | 'Occupied';

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

export interface IOvalTable{
    /**
     * The shape for the IOvalTable ("Oval")
     */
    tableShape: 'Oval';

    /**
     * The unique identifier for the table
     */
    tableID: string;

    /**
     * Array of chairs
     */
    chairs: Array<IChair>;

    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;

    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;

    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
}