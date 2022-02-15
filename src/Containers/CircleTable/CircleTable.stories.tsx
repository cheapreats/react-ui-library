import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CircleTable, ITable } from '@Containers';


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
 * Prints the Selected Child index to the console when Chair is clicked
 * @param chairIndex
 */
const handleOnChairClick = (
    chairIndex: number,
) => {
    console.log(
        `Chair: ${chairIndex}`,
    );
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
            chairIndex: 0,
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
            onChairClick: handleOnChairClick,
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
            chairIndex: 1,
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
            onChairClick: handleOnChairClick,
        },
    ],
    tableUse: 'TableForEditCanvas',
    onTableClick: handleTableClick,
};
