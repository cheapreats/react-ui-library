import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ISquareTable, SquareTable } from '@Containers';


export default {
    title: 'Components/TableManagement/SquareTable',
    component: SquareTable,
} as Meta;

const Template: Story<ISquareTable> = (args) => <SquareTable {...args} />;

/**
 * Prints the Selected Child index to the console when Table is clicked
 * @param selectedChildIndex
 */
const handleTableClick = (selectedChildIndex: number) => {
    console.log(selectedChildIndex);
};

/**
 * Prints the Selected Child index to the console when Chair is clicked
 * @param chairIndex
 */
const handleOnChairClick = (
    chairIndex: number,
) => {
    console.log(
        `${chairIndex}`,
    );
};

/**
 *Creates a square table with 7 chairs
 */
export const SevenTopSquareTable = Template.bind({});
SevenTopSquareTable.args = {
    tableShape: 'Square',
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
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: false,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
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
    tableShape: 'VerticalRectangle',
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
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
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
    tableShape: 'HorizontalRectangle',
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
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
    ],
    isSquare: false,
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};

export const SquareTableEditPage = Template.bind({});
SquareTableEditPage.args = {
    tableShape: 'Square',
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
            chairIndex: 0,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'bottom',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 1,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 5,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'right',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForEditCanvas',
            chairIndex: 5,
            onChairClick: handleOnChairClick,
        },
    ],
    tableUse: 'TableForEditCanvas',
    onTableClick: handleTableClick,
};

export const BarRectangleTable = Template.bind({});
BarRectangleTable.args = {
    tableShape: 'VerticalRectangle',
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
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'David',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'James',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'left',
            isSeated: true,
            occupiedBy: 'Yuri',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            onChairClick: handleOnChairClick,
        },
    ],
    isSquare: false,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};
