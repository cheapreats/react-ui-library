/*
    Created by:                Corey Rogers
    Date submitted (v1):       10/26/2020
    File:                      RectangleTable.stories.js
    File Description:          The Storybook file for the RectangleTable component.
*/

import React from 'react';
//import { createStoryTitle } from '../Constants';

import { RectangleTable } from './RectangleTable';

export default {
    title: 'Components/RectangleTable',
    
    // Use createStoryTitle() with react-ui-library
    //title: createStoryTitle('RectangleTable'),
    component: RectangleTable,
};

const Template = (args) => <RectangleTable {...args} />;

export const TwoTopRectangle = Template.bind({});
TwoTopRectangle.args = {

    tableID: 'T3',
    numOfChairs: 2,
    partyName: 'Sarah C.',
    reservationTime: new Date(2020,9,15,5,30,0,0),
    occupancyStatus: 'Vacant',
};

export const FourTopRectangle = Template.bind({});
FourTopRectangle.args = {
    tableID: 'T7',
    numOfChairs: 4,
    partyName: 'Robert J.',
    reservationTime: new Date(2020,9,15,12,30,0,0),
    occupancyStatus: 'Occupied',
};

export const SixTopRectangle = Template.bind({});
SixTopRectangle.args = {
    tableID: 'T10',
    numOfChairs: 6,
    partyName: 'Michael V.',
    reservationTime: new Date(2020,9,15,9,30,0,0),
    occupancyStatus: 'Reserved',
};


