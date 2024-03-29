import React from 'react';
import { Meta, Story } from '@storybook/react';
import { InfoHeader,InfoHeaderProps} from '../../index';


export default {
    title: 'Components/Other/InfoHeader',
    component: InfoHeader,
    argTypes: {
        onMouseEnter: { action: 'Hover' },
        onMouseLeave: { action: 'Leave' }
    },
    args: {
        tooltiptext: 'Basic tooltip',
    }
} as Meta;

const Template: Story<InfoHeaderProps> = (args) => (
    <InfoHeader {...args}/>
);

export const BasicText = Template.bind({});
BasicText.args = {
    infotext: 'Reach', 
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