import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EditDraggableCanvas, IEditDraggableCanvas } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('EditDraggableCanvas'),
    component: EditDraggableCanvas,
} as Meta;

const Template: Story<IEditDraggableCanvas> = (args) => (
    <EditDraggableCanvas {...args} />
);

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

export const NewUserCanvasExample = Template.bind({});
NewUserCanvasExample.args = {
    currentNumberOfChairs: 0,
    maxCapacity: 0,
    canvasType: 'newUserCanvas',
    handleStop: handleOnStop,
    tables: [
        {
            tableInput: {
                tableShape: 'Square',
                tableID: 'T1',
                partyName: '',
                isSquare: true,
                occupancyStatus: 'Vacant',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'bottom',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 50, y: 24 },
            arrayIndex: 0,
        },
    ],
};

/**
 * Example of component for use with the Edit screen
 */
export const EditCanvasExample = Template.bind({});
EditCanvasExample.args = {
    currentNumberOfChairs: 0,
    maxCapacity: 0,
    canvasType: 'editCanvas',
    handleStop: handleOnStop,
    tables: [
        {
            tableInput: {
                tableShape: 'Square',
                tableID: 'T1',
                partyName: '',
                isSquare: true,
                occupancyStatus: 'Vacant',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'bottom',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 50, y: 24 },
            arrayIndex: 0,
        },
        {
            tableInput: {
                tableShape: 'Square',
                tableID: 'T5',
                partyName: 'Tina',
                isSquare: true,
                occupancyStatus: 'Occupied',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Suzy',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'bottom',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'left',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'right',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 375, y: 37 },
            arrayIndex: 0,
        },
        {
            // table 4 beginning
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
                    },
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Dean',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Corey',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Claire',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Sam',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 367, y: -199 },
            arrayIndex: 0,
        }, // table 4 end
        {
            // table 3 beginning
            tableInput: {
                tableShape: 'Square',
                tableID: 'T3',
                partyName: 'Dmytro',
                isSquare: false,
                occupancyStatus: 'Reserved',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'left',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'right',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'left',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'right',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 210, y: -283 },
            arrayIndex: 0,
        }, // table 3 end
        {
            // table 2 beginning
            tableInput: {
                tableShape: 'Circle',
                tableID: 'T2',
                partyName: 'Corey',
                occupancyStatus: 'Occupied',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Bob',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Joe',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Mike',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Paula',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Ashley',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForEditCanvas',
                    },
                ],
                tableUse: 'TableForEditCanvas',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 43, y: -363 },
            arrayIndex: 0,
        }, // table 2 end
    ],
};

/**
 * Example of component for use with the Management screen
 */
export const MgmtCanvasExample = Template.bind({});
MgmtCanvasExample.args = {
    currentNumberOfChairs: 0,
    maxCapacity: 0,
    canvasType: 'managementCanvas',
    handleStop: handleOnStop,
    tables: [
        {
            tableInput: {
                tableShape: 'Square',
                tableID: 'T1',
                partyName: '',
                isSquare: true,
                occupancyStatus: 'Vacant',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'bottom',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                ],
                tableUse: 'TableForManagement',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 50, y: 24 },
            arrayIndex: 0,
        },
        {
            tableInput: {
                tableShape: 'Square',
                tableID: 'T5',
                partyName: 'Tina',
                isSquare: true,
                occupancyStatus: 'Occupied',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Suzy',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'bottom',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'left',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'right',
                        isSeated: true,
                        occupiedBy: 'Tina',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                ],
                tableUse: 'TableForManagement',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 375, y: 37 },
            arrayIndex: 0,
        },
        {
            // table 4 beginning
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
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Dean',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Corey',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Claire',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Sam',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                ],
                tableUse: 'TableForManagement',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 367, y: -199 },
            arrayIndex: 0,
        }, // table 4 end
        {
            // table 3 beginning
            tableInput: {
                tableShape: 'Square',
                tableID: 'T3',
                partyName: 'Dmytro',
                isSquare: false,
                occupancyStatus: 'Reserved',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'left',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'right',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'left',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'right',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                ],
                tableUse: 'TableForManagement',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 210, y: -283 },
            arrayIndex: 0,
        }, // table 3 end
        {
            // table 2 beginning
            tableInput: {
                tableShape: 'Circle',
                tableID: 'T2',
                partyName: 'Corey',
                occupancyStatus: 'Occupied',
                relativeSize: 0.25,
                chairs: [
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Bob',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: false,
                        occupiedBy: '',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Joe',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Mike',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Paula',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                    {
                        position: 'top',
                        isSeated: true,
                        occupiedBy: 'Ashley',
                        isVisible: true,
                        isRound: true,
                        relativeSize: 1,
                        tableUse: 'TableForManagement',
                    },
                ],
                tableUse: 'TableForManagement',
            },
            handleStop: handleOnStop,
            defaultXY: { x: 43, y: -363 },
            arrayIndex: 0,
        }, // table 2 end
    ],
};
