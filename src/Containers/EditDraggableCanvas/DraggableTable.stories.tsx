import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    DraggableTable,
    IDraggableTable,
} from '@Containers/EditDraggableCanvas/_DraggableTable';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('DraggableTable'),
    component: DraggableTable,
} as Meta;

const Template: Story<IDraggableTable> = (args) => <DraggableTable {...args} />;

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
 */
const handleOnChairClick = (tableIndex: number, chairIndex: number) => {
    console.log(`Table: ${tableIndex} Chair: ${chairIndex}`);
};

/**
 * Will print out the index, x and y coordinates of Draggable Table
 * when the drag stops
 * @param selectedChildIndex
 * @param deltaX
 * @param deltaY
 */
const handleOnStop = (
    selectedChildIndex: number,
    deltaX: number,
    deltaY: number,
) => {
    console.log(selectedChildIndex, deltaX, deltaY);
};

/**
 *Creates a SquareTable component with 4 chairs
 */
export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableInput: {
        tableShape: 'Circle',
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
                chairIndex: 0,
                tableIndex: 2,
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
                onChairClick: handleOnChairClick,
            },
        ],
        tableUse: 'TableForEditCanvas',
        onTableClick: handleTableClick,
        onChairClick: handleOnChairClick,
    },
    handleStop: handleOnStop,
    defaultXY: { x: 367, y: 154 },
    arrayIndex: 0,
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
};
