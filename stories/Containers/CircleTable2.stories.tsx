import React from 'react';
import { CircleTable2, ICircleTable2 } from '../../src/Containers/CircleTable2';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('CircleTable2'),
    component: CircleTable2,
} as Meta;

const Template: Story<ICircleTable2> = (args) => <CircleTable2 {...args} />;

/**
 *Creates a SquareTable component with 4 chairs
 */

export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableID: 'T1',
    numOfChairs: 4,
    partyName: 'Dmytro',
    reservationTime: new Date(2020, 10, 15, 16, 30, 0, 0),
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
    reservationTime: new Date(2020, 10, 15, 16, 30, 0, 0),
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
    reservationTime: new Date(2020, 10, 15, 16, 30, 0, 0),
    occupancyStatus: 'Occupied',
};
