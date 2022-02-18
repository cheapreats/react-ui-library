import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IChair, IDraggableTable } from '@Containers';
import {action} from "@storybook/addon-actions";

import {
    SeatingInfoInput,
    ISeatingInfoInput,
} from '@Containers/SeatingInfoInput/SeatingInfoInput';


export default {
    title: 'Components/TableManagement/SeatingInfoInput',
    component: SeatingInfoInput,
} as Meta;

/**
 * Prints to the console when SeatCustomer button has been hit
 */
const handleSeatCustomerClick = () => {
    console.log('SeatCustomer Button has been clicked.');
};

/**
 * Prints to the console when Back button has been hit
 */
const handleBackButtonClick = () => {
    console.log('Back Button has been clicked.');
};

/**
 * Prints to the console when AddToWaitList button has been hit
 */
const handleAddToWaitListClick = () => {
    console.log('AddToWaitList button has been clicked');
};

/**
 * Prints to the console when EndReservation button has been hit
 */
const handleEndReservationClick = () => {
    console.log('EndReservation button has been clicked');
};

const handleTableClick = () => {
    console.log();
};

/**
 * An IChair object that can be modified for use with the
 * various types of tables
 */
const chairObjectForTables: IChair = {
    position: 'top',
    isSeated: false,
    occupiedBy: '',
    isVisible: true,
    isRound: true,
    relativeSize: 1,
    tableUse: 'TableForEditCanvas',
    onChairClick: action("Chair is clicked"),
};

/**
 * Updates the selected table with new x and y coordinates when the user
 * stops dragging the table on the canvas
 * @param selectedTableIndex - the array index for the selected table
 * @param deltaX - the new x coordinate for the table
 * @param deltaY - the new y coordinate for the table
 */
const handleDragEnd = (
    selectedTableIndex: number,
    deltaX: number,
    deltaY: number,
) => {
    console.log(selectedTableIndex + deltaX + deltaY);
};

/**
 * A IDraggableTable object that can be modified for use with various
 * table components
 */
const tableObjectForCanvas: IDraggableTable = {
    // table 4 beginning
    tableShape: 'Circle',
    tableInput: {
        tableID: 'T*',
        partyName: '',
        occupancyStatus: 'Vacant',
        timeLastServed:"00:00:00",
        chairs: [],
        relativeSize: 0.25,
        tableUse: 'TableForEditCanvas',
        onTableClick: handleTableClick
    },
    handleStop: handleDragEnd,
    defaultXY: { x: 210, y: 100 },
    arrayIndex: 0,
    isDisabled: false,
    selectedIndex: 1,
    onTableClick: handleTableClick,
    onChairClick: action("Chair is clicked"),
    layoutName: 'Dining Room',
};

/**
 * A mock layout for use with the Management page. Simulates the Array<IDraggableTable>
 * that would be received from the database for a particular layout.
 */
const mockLayoutForManagePage: Array<IDraggableTable> = [
    {
        // Table 1
        ...tableObjectForCanvas,
        tableShape: 'Square',
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableID: 'T1',
            isSquare: true,
            chairs: [
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'bottom',
                    tableUse: 'TableForManagement',
                },
            ],
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 50, y: 24 },
    },
    {
        // Table 5
        ...tableObjectForCanvas,
        tableShape: 'Square',
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableID: 'T5',
            isSquare: true,
            chairs: [
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'right',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'bottom',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'left',
                    tableUse: 'TableForManagement',
                },
            ],
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 375, y: 37 },
    },
    {
        // Table 4
        ...tableObjectForCanvas,
        tableShape: 'Circle',
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableID: 'T4',
            chairs: [
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'bottom',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
            ],
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 367, y: 144 },
    },
    {
        // Table 3
        ...tableObjectForCanvas,
        tableShape: 'Square',
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableID: 'T3',
            isSquare: false,
            chairs: [
                {
                    ...chairObjectForTables,
                    position: 'right',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'left',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'right',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'left',
                    tableUse: 'TableForManagement',
                },
            ],
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 210, y: 57 },
    },
    {
        // Table 2
        ...tableObjectForCanvas,
        tableShape: 'Circle',
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableID: 'T2',
            chairs: [
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'bottom',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
                {
                    ...chairObjectForTables,
                    position: 'top',
                    tableUse: 'TableForManagement',
                },
            ],
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 43, y: 177 },
    },
];

const Template: Story<ISeatingInfoInput> = (args) => (
    <SeatingInfoInput {...args} />
);

/**
 * Creates SeatingInfoComponent
 */
export const SeatingInfoComponent = Template.bind({});

SeatingInfoComponent.args = {
    availableSeatingInfo: mockLayoutForManagePage,
    occupancyStatusList: ['Vacant', 'Occupied', 'Reserved'],
    allRooms: ['All Locations', 'Kitchen', 'New Room'],
    onBackButtonClick: handleBackButtonClick,
    onSelectCustomerClick: handleSeatCustomerClick,
    onAddToWaitListClick: handleAddToWaitListClick,
    onEndReservationClick: handleEndReservationClick,
    onSeatCustomerClick: handleSeatCustomerClick,
};
