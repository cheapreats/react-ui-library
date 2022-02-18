import React from 'react';
import { Meta, Story } from '@storybook/react';
import { WaitTimeDisplay, IWaitTimeDisplay } from '../../index';


export default {
    title: 'Components/TableManagement/WaitTimeDisplay',
    component: WaitTimeDisplay,
} as Meta;

const Template: Story<IWaitTimeDisplay> = (args) => (
    <WaitTimeDisplay {...args} />
);

export const Primary = Template.bind({});

/**
 *Creates a WaitTimeDisplay component with a number
 */

Primary.args = {
    AverageWaitTime: 29,
};
