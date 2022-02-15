import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CircleTable} from '@Containers';
import {action} from "@storybook/addon-actions";
import {ITable} from "@Utils";


export default {
    title: 'Components/TableManagement/CircleTable',
    component: CircleTable,
} as Meta;

const Template: Story<ITable> = (args) => <CircleTable {...args} />;

/**
 * Prints the Selected Child index to the console when Table is clicked
 */
const handleTableClick = () => {
    console.log();
};


/**
 *Creates a SquareTable component with 4 chairs
 */
export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableShape: 'Circle',
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
    timeLastServed: '0:00:00',
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
    ],
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};

export const TableForEditDraggableCanvas = Template.bind({});
TableForEditDraggableCanvas.args = {
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
    onTableClick: handleTableClick,
};
