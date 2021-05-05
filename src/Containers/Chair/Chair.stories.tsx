import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Chair, IChair } from './Chair';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Chair'),
    component: Chair,
} as Meta;

const Template: Story<IChair> = (args) => <Chair {...args} />;

/**
 * Prints the table index and the chair index to the console
 * when Chair is clicked
 * @param tableIndex
 * @param chairIndex
 */
const handleOnChairClick = (tableIndex: number, chairIndex: number) => {
    console.log(`Table: ${tableIndex} Chair: ${chairIndex}`);
};

/**
 * Prints a message to the console
 */
const handleUpdateTable = () => {
    console.log("Update table called");
};

/**
 *Creates free chair
 */
export const ChairFreeTop = Template.bind({});
ChairFreeTop.args = {
    position: 'top',
    relativeSize: 0.5,
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedTop = Template.bind({});
ChairOccupiedTop.args = {
    position: 'top',
    isSeated: true,
    occupiedBy: 'Dmytro',
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedBottom = Template.bind({});
ChairOccupiedBottom.args = {
    position: 'bottom',
    isSeated: true,
    occupiedBy: 'Scott',
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates free chair
 */
export const ChairFreeLeft = Template.bind({});
ChairFreeLeft.args = {
    position: 'left',
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedLeft = Template.bind({});
ChairOccupiedLeft.args = {
    position: 'left',
    isSeated: true,
    occupiedBy: 'Dmytro',
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedRight = Template.bind({});
ChairOccupiedRight.args = {
    position: 'right',
    isSeated: true,
    occupiedBy: 'Corey',
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

/**
 *Creates round chair
 */
export const ChairOccupiedRound = Template.bind({});
ChairOccupiedRound.args = {
    isSeated: true,
    occupiedBy: 'Jack',
    isRound: true,
    relativeSize: 0.5,
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};

export const ChairEditDraggableCanvas = Template.bind({});
ChairEditDraggableCanvas.args = {
    position: 'top',
    isSeated: false,
    occupiedBy: '',
    isVisible: true,
    relativeSize: 1,
    tableUse: 'TableForEditCanvas',
    chairIndex: 3,
    tableIndex: 4,
    onChairClick: handleOnChairClick,
    updateTable: handleUpdateTable,
};
