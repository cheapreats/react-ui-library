import React from 'react';
import { SquareTable, ISquareTable } from '../../src/Containers/SquareTable';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';
import { IChair } from '../../src/Containers';

export default {
    title: createStoryTitle('SquareTable'),
    component: SquareTable,
} as Meta;

const Template: Story<ISquareTable> = (args) => <SquareTable {...args} />;

const chairProps: Array<IChair> = [
    { position: 'top', isSeated: true, occupiedBy: 'Scott', isVisible: true },
    { position: 'top', isSeated: false, occupiedBy: '', isVisible: true },
    { position: 'bottom', isSeated: true, occupiedBy: 'Dean', isVisible: true },
    { position: 'left', isSeated: false, occupiedBy: '', isVisible: true },
    { position: 'left', isSeated: true, occupiedBy: 'Corey', isVisible: true },
    { position: 'right', isSeated: false, occupiedBy: '', isVisible: false },
    { position: 'right', isSeated: true, occupiedBy: 'Jack', isVisible: true },
    { position: 'bottom', isSeated: false, occupiedBy: '', isVisible: true },
    { position: 'bottom', isSeated: true, occupiedBy: 'Sam', isVisible: true }
];

/**
 *Creates a SquareTable component with 7 chairs
 */
export const SevenTopTable = Template.bind({});
SevenTopTable.args = {
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
    chairs: chairProps,
};
