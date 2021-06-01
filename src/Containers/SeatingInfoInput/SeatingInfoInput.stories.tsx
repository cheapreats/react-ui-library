import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { IChair, IDraggableTable } from '@Containers';
import { SeatingInfoInput, ISeatingInfoInput } from './SeatingInfoInput';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('SeatingInfoInput'),
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

const [selectedIndex, setSelectedIndex] = useState(-1);
const handleTableClick = (selectedTableIndex: number) => {
    setSelectedIndex(selectedTableIndex);
};

/**
 * Changes the visibility of the a Chair when Chair is clicked
 * @param tableIndex
 * @param chairIndex
 * @param selectedTableIndex
 */
const handleOnChairClick = (
    tableIndex: number,
    chairIndex: number,
    selectedTableIndex: number,
) => {
    if (selectedTableIndex > -1) {
        console.log(tablesArray);
        const newArray = [...tablesArray];
        console.log(`newArray: ${newArray}`);
    }
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
    tableIndex: 0,
    chairIndex: 0,
    selectedIndex,
    onChairClick: handleOnChairClick,
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
    const currentArray = tablesArray;
    currentArray[selectedTableIndex].defaultXY.x = deltaX;
    currentArray[selectedTableIndex].defaultXY.y = deltaY;
    setTablesArray(currentArray);
};

/**
 * A IDraggableTable object that can be modified for use with various
 * table components
 */
const tableObjectForCanvas: IDraggableTable = {
    // table 4 beginning
    tableInput: {
        tableShape: 'Circle',
        tableID: 'T*',
        partyName: '',
        occupancyStatus: 'Vacant',
        chairs: [],
        relativeSize: 0.25,
        tableUse: 'TableForEditCanvas',
        selectedIndex,
        onTableClick: handleTableClick,
        onChairClick: handleOnChairClick,
    },
    handleStop: handleDragEnd,
    defaultXY: { x: 210, y: 100 },
    arrayIndex: 0,
    isDisabled: false,
    selectedIndex,
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
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
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableShape: 'Square',
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
            arrayIndex: 0,
        },
        defaultXY: { x: 50, y: 24 },
    },
    {
        // Table 5
        ...tableObjectForCanvas,
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableShape: 'Square',
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
            arrayIndex: 1,
        },
        defaultXY: { x: 375, y: 37 },
    },
    {
        // Table 4
        ...tableObjectForCanvas,
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableShape: 'Circle',
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
            arrayIndex: 2,
        },
        defaultXY: { x: 367, y: 144 },
    },
    {
        // Table 3
        ...tableObjectForCanvas,
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableShape: 'VerticalRectangle',
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
            arrayIndex: 3,
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 210, y: 57 },
    },
    {
        // Table 2
        ...tableObjectForCanvas,
        tableInput: {
            ...tableObjectForCanvas.tableInput,
            tableShape: 'Circle',
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
            arrayIndex: 4,
            tableUse: 'TableForManagement',
        },
        defaultXY: { x: 43, y: 177 },
    },
];

/**
 * tablesArray is the array of all the tables to be rendered and put on the canvas.
 */
const [tablesArray, setTablesArray] = useState(mockLayoutForManagePage);

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
