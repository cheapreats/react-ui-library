import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CircleTable, ICircleTable } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CircleTable'),
    component: CircleTable,
} as Meta;

const Template: Story<ICircleTable> = (args) => <CircleTable {...args} />;

/**
 * Prints the Selected Child index to the console when Table is clicked
 * @param selectedChildIndex
 */
const handleTableClick = (selectedChildIndex: number) => {
    console.log(selectedChildIndex);
};

/**
 * Prints the Selected Child index to the console when Chair is clicked
 * @param tableIndex
 * @param chairIndex
 * @param selectedTableIndex
 */
const handleOnChairClick = (tableIndex: number, chairIndex: number, selectedTableIndex: number) => {
    console.log(`Table: ${tableIndex} Chair: ${chairIndex} SelectedTable: ${selectedTableIndex}`);
};

/**
 *Creates a SquareTable component with 4 chairs
 */
export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableShape: "Circle",
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
    selectedIndex: -1,
    onChairClick: handleOnChairClick,
};

export const TableForEditDraggableCanvas = Template.bind({});
TableForEditDraggableCanvas.args = {
    tableShape: "Circle",
    tableID: 'T4',
    partyName: 'Scott',
    occupancyStatus: 'Occupied',
    relativeSize: 0.25,
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sarah',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 1,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 1,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 2,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 3,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Claire',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 4,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 5,
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    tableUse: 'TableForEditCanvas',
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
    arrayIndex: 2,
    selectedIndex: -1,
};
