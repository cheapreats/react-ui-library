import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    DraggableTable,
    IDraggableTable,
} from '@Containers/EditDraggableCanvas/_DraggableTable';
import {action} from "@storybook/addon-actions";


export default {
    title: 'Components/TableManagement/DraggableTable',
    component: DraggableTable,
} as Meta;

const Template: Story<IDraggableTable> = (args) => <DraggableTable {...args} />;

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
        timeLastServed:"00:00:00",
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
                onChairClick: action("Chair is clicked"),
            },
            {
                position: 'top',
                isSeated: false,
                occupiedBy: '',
                isVisible: true,
                isRound: true,
                relativeSize: 1,
                tableUse: 'TableForEditCanvas',
                onChairClick: action("Chair is clicked"),
            },
            {
                position: 'top',
                isSeated: true,
                occupiedBy: 'Dean',
                isVisible: true,
                isRound: true,
                relativeSize: 1,
                tableUse: 'TableForEditCanvas',
                onChairClick: action("Chair is clicked"),
            },
            {
                position: 'top',
                isSeated: true,
                occupiedBy: 'Corey',
                isVisible: true,
                isRound: true,
                relativeSize: 1,
                tableUse: 'TableForEditCanvas',
                onChairClick: action("Chair is clicked"),
            },
            {
                position: 'top',
                isSeated: true,
                occupiedBy: 'Claire',
                isVisible: true,
                isRound: true,
                relativeSize: 1,
                tableUse: 'TableForEditCanvas',
                onChairClick: action("Chair is clicked"),
            },
            {
                position: 'top',
                isSeated: true,
                occupiedBy: 'Sam',
                isVisible: true,
                isRound: true,
                relativeSize: 1,
                tableUse: 'TableForEditCanvas',
                onChairClick: action("Chair is clicked"),
            },
        ],
        tableUse: 'TableForEditCanvas',
        onTableClick: action("Table is clicked"),
    },
    handleStop: handleOnStop,
    defaultXY: { x: 367, y: 154 },
    arrayIndex: 0,
    selectedIndex: 3,
    onTableClick: action("Table is clicked"),
    onChairClick: action("Chair is clicked"),
};
