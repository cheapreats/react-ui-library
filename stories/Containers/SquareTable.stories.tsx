import React from 'react';
import { SquareTable, ISquareTable } from '../../src/Containers/SquareTable';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('SquareTable'),
    component: SquareTable,
} as Meta;

const Template: Story<ISquareTable> = (args) => <SquareTable {...args} />;

/**
 *Creates a SquareTable component with 4 chairs
 */

export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableID: 'T1',
    numOfChairs: 4,
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
};

/**
 *Creates a SquareTable component with 8 chairs
 */

export const EightTopTable = Template.bind({});
EightTopTable.args = {
    tableID: 'T2',
    numOfChairs: 8,
    partyName: 'Scott',
    occupancyStatus: 'Reserved',
};

/**
 *Creates a SquareTable component with 12 chairs
 */

export const TwelveTopTable = Template.bind({});
TwelveTopTable.args = {
    tableID: 'T4',
    numOfChairs: 12,
    partyName: 'Corey',
    occupancyStatus: 'Occupied',
};
