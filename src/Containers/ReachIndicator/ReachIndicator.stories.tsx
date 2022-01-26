import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { ReachIndicator, ReachIndicatorProps } from '../../index'
 

export default {
    title: 'Components/Analytics/Reach Indicator',
    component: ReachIndicator,
} as Meta;
const Template: Story<ReachIndicatorProps> = (args) => <ReachIndicator {...args} /> 

export const ReachIndicatorBasic = Template.bind({});
ReachIndicatorBasic.args = {
    indicatorName: 'Post Engagement', 
    indicatorNum: 10,
    indicatorGoal: 50,
    indicatorPercentMark: 50,
    indicatorMinimum: 0, 
};

export const ReachIndicatorPeopleReached = Template.bind({});
ReachIndicatorPeopleReached.args = {
    indicatorName: 'People Reached',
    indicatorNum: 50,
    indicatorGoal: 70,
    indicatorPercentMark: 50,
    indicatorMinimum: 0,
};

export const ReachIndicatorMin = Template.bind({});
ReachIndicatorMin.args = {
    indicatorName: 'Post Engagement',
    indicatorNum: 0,
    indicatorGoal: 50,
    indicatorPercentMark: 50,
    indicatorMinimum: 0, 
};

export const ReachIndicatorVerbose = Template.bind({});
ReachIndicatorVerbose.args = {
    indicatorName: 'The number of people who engaged with this post is featured as a percentage of a goal amount below',
    indicatorNum: 1500000,
    indicatorGoal: 500000,
    indicatorPercentMark: 50,
    indicatorMinimum: 0,
};