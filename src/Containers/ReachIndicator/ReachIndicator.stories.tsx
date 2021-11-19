import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { ReachIndicator, ReachIndicatorProps } from '../../index'
import { createStoryTitle } from '../../Constants'; 

export default {
    title: createStoryTitle('Reach Indicator'),
    component: ReachIndicator,
} as Meta;
const Template: Story<ReachIndicatorProps> = (args) => <ReachIndicator {...args} /> 

export const ReachIndicatorBasic = Template.bind({});
ReachIndicatorBasic.args = {
    engageNum: 10,
    engageGoal: 50,
    reachNum: 30,
    reachGoal: 100,
    percentMark: 50,
    indicatorMinimum: 0,
};

export const ReachIndicatorMax = Template.bind({});
ReachIndicatorMax.args = {
    engageNum: 50,
    engageGoal: 50,
    reachNum: 100,
    reachGoal: 100,
    percentMark: 50,
    indicatorMinimum: 0, 
};

export const ReachIndicatorMin = Template.bind({});
ReachIndicatorMin.args = {
    engageNum: 0,
    engageGoal: 50,
    reachNum: 0,
    reachGoal: 100,
    percentMark: 50,
    indicatorMinimum: 0,
};