import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Chair, IChair } from './Chair';
import { createStoryTitle } from '../../../stories/Constants';

export default {
    title: createStoryTitle('Chair'),
    component: Chair,
} as Meta;

const Template: Story<IChair> = (args) => <Chair {...args} />;

/**
 *Creates free chair
 */
export const ChairFreeTop = Template.bind({});
ChairFreeTop.args = {
    position: 'top',
    relativeSize: 0.5,
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedTop = Template.bind({});
ChairOccupiedTop.args = {
    position: 'top',
    isSeated: true,
    occupiedBy: 'Dmytro',
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedBottom = Template.bind({});
ChairOccupiedBottom.args = {
    position: 'bottom',
    isSeated: true,
    occupiedBy: 'Scott',
};

/**
 *Creates free chair
 */
export const ChairFreeLeft = Template.bind({});
ChairFreeLeft.args = {
    position: 'left',
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedLeft = Template.bind({});
ChairOccupiedLeft.args = {
    position: 'left',
    isSeated: true,
    occupiedBy: 'Dmytro',
};

/**
 *Creates occupied chair
 */
export const ChairOccupiedRight = Template.bind({});
ChairOccupiedRight.args = {
    position: 'right',
    isSeated: true,
    occupiedBy: 'Corey',
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
};
