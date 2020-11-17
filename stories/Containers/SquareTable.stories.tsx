import React from 'react';
import { SquareTable, ISquareTable } from '../../src/Containers/SquareTable';
import {Meta, Story} from "@storybook/react";
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
    chairsTop:1,
    chairsBottom:1,
    chairsLeft: 1,
    chairsRight:1,
    partyName:'Dmytro',
    reservationTime:new Date(2020,10,15,16,30,0,0),
    occupancyStatus:'Vacant',
};

/**
 *Creates a SquareTable component with 8 chairs
 */

export const EightTopTable = Template.bind({});
EightTopTable.args = {
    tableID: 'T2',
    chairsTop:1,
    chairsBottom:2,
    chairsLeft: 3,
    chairsRight:1,
    partyName:'Scott',
    reservationTime:new Date(2020,10,15,16,30,0,0),
    occupancyStatus:'Reserved',
};

/**
 *Creates a SquareTable component with 12 chairs
 */

export const TwelveTopTable = Template.bind({});
TwelveTopTable.args = {
    tableID: 'T4',
    chairsTop:1,
    chairsBottom:2,
    chairsLeft: 3,
    chairsRight:1,
    partyName:'Corey',
    reservationTime:new Date(2020,10,15,16,30,0,0),
    occupancyStatus:'Occupied',
};




