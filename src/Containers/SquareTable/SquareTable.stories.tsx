import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ISquareTable, SquareTable } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('SquareTable'),
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
 * @param tableIndex
 * @param chairIndex
 * @param selectedTableIndex
 */
const handleOnChairClick = (
    tableIndex: number,
    chairIndex: number,
    selectedTableIndex: number,
) => {
    console.log(
        `Table: ${tableIndex} Chair: ${chairIndex} SelectedTable: ${selectedTableIndex}`,
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
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            relativeSize: 1,
            tableUse: 'TableForManagement',
            chairIndex: 4,
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    isSquare: true,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    isSquare: false,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
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
            tableIndex: 2,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    isSquare: false,
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
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
            tableIndex: 3,
            selectedIndex: 3,
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
            tableIndex: 3,
            selectedIndex: 3,
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
            tableIndex: 3,
            selectedIndex: 3,
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
            tableIndex: 3,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    tableUse: 'TableForEditCanvas',
    onTableClick: handleTableClick,
    onChairClick: handleOnChairClick,
};
