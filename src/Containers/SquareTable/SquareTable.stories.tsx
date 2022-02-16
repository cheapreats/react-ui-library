import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ISquareTable, SquareTable } from '@Containers';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Components/TableManagement/SquareTable',
    component: SquareTable,
} as Meta;

const Template: Story<ISquareTable> = (args) => <SquareTable {...args} />;

/**
 * Prints the Selected Child index to the console when Table is clicked
 */
const handleTableClick = () => {
    console.log();
};

/**
 *Creates a square table with 7 chairs
 */
export const SevenTopSquareTable = Template.bind({});
SevenTopSquareTable.args = {
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
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: false,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
    ],
    isSquare: true,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};

/**
 *Creates a vertical rectangle table with 8 chairs
 */
export const EightTopVertRectangleTable = Template.bind({});
EightTopVertRectangleTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Occupied',
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
    ],
    isSquare: false,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};

/**
 *Creates a horizontal rectangle table with 6 chairs
 */
export const SixTopHorizontalRectangleTable = Template.bind({});
SixTopHorizontalRectangleTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Reserved',
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
    ],
    isSquare: false,
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};

export const SquareTableEditPage = Template.bind({});
SquareTableEditPage.args = {
    tableID: 'T3',
    partyName: 'Dmytro',
    isSquare: false,
    occupancyStatus: 'Reserved',
    relativeSize: 0.25,
    chairs: [
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'bottom',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            onChairClick: action("Chair is clicked"),
        },
    ],
    tableUse: 'TableForEditCanvas',
    onTableClick: handleTableClick,
};

export const BarRectangleTable = Template.bind({});
BarRectangleTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Occupied',
    chairs: [
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Jada',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'David',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'James',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Yurii',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            onChairClick: action("Chair is clicked"),
        },
    ],
    isSquare: false,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};
