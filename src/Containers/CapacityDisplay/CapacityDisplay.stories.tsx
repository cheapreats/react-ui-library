/*
    Created by:                Corey Rogers
    Date submitted (v1):       11/16/2020
    File:                      CapacityDisplay.stories.js
    File Description:          The Storybook file for the CapacityDisplay component.
*/

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CapacityDisplay, ICapacityDisplay } from './CapacityDisplay';


export default {
    title: 'Components/TableManagement/CapacityDisplay',
    component: CapacityDisplay,
} as Meta;

const Template: Story<ICapacityDisplay> = (args) => (
    <CapacityDisplay {...args} />
);

/**
 *Creates a RectangleTable component with 2 chairs
 */

export const FiftyPercentCapacity = Template.bind({});
FiftyPercentCapacity.args = {
    totalSeatsOccupied: 8,
    totalNumberOfSeats: 16,
};

export const EmptyCapacity = Template.bind({});
EmptyCapacity.args = {
    totalSeatsOccupied: 0,
    totalNumberOfSeats: 16,
};

export const FullCapacity = Template.bind({});
FullCapacity.args = {
    totalSeatsOccupied: 16,
    totalNumberOfSeats: 16,
};
