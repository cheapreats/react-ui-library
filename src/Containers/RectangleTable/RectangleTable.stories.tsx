/*
    Created by:                Corey Rogers
    Date submitted (v1):       10/26/2020
    File:                      RectangleTable.stories.js
    File Description:          The Storybook file for the RectangleTable component.
*/

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { occupancyStatusTypes } from "@Containers";
import {
    RectangleTable,
    IRectangleTable,
} from './RectangleTable';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('RectangleTable'),
    component: RectangleTable,
} as Meta;

const Template: Story<IRectangleTable> = (args) => <RectangleTable {...args} />;

/**
 *Creates a RectangleTable component with 2 chairs
 */

export const TwoTopRectangle = Template.bind({});
TwoTopRectangle.args = {
    tableID: 'T3',
    numOfChairs: 2,
    partyName: 'Sarah C.',
    reservationTime: new Date(2020, 9, 15, 5, 30, 0, 0),
    occupancyStatus: occupancyStatusTypes.Vacant,
};

/**
 *Creates a RectangleTable component with 4 chairs
 */

export const FourTopRectangle = Template.bind({});
FourTopRectangle.args = {
    tableID: 'T7',
    numOfChairs: 4,
    partyName: 'Robert J.',
    reservationTime: new Date(2020, 9, 15, 12, 30, 0, 0),
    occupancyStatus: occupancyStatusTypes.Occupied,
};

/**
 *Creates a RectangleTable component with 6 chairs
 */

export const SixTopRectangle = Template.bind({});
SixTopRectangle.args = {
    tableID: 'T10',
    numOfChairs: 6,
    partyName: 'Michael V.',
    reservationTime: new Date(2020, 9, 15, 9, 30, 0, 0),
    occupancyStatus: occupancyStatusTypes.Reserved,
};
