import React from 'react';
import { Meta, Story } from '@storybook/react';
import { InfoHeader,InfoHeaderProps} from '../../index';
import { createStoryTitle} from '../../Constants';

export default {
    title: createStoryTitle('InfoHeader'),
    component: InfoHeader,
} as Meta;

const Template: Story<InfoHeaderProps> = (args) => (
    <InfoHeader {...args}/>
);

export const BasicText = Template.bind({});
BasicText.args = {
    infotext: 'Reach',
    tooltiptext: 'Basic tooltip', 
};

export const LargeText = Template.bind({});
LargeText.args = {
    infotext: 'ReachReachReachReachReachReachReachReachReachReachReachReachReachReachReachReachReach', 
    tooltiptext: 'Text goes off screen', 
};

export const NoText = Template.bind({});
NoText.args = {
    infotext: '',
    tooltiptext: 'Icon remains', 
};