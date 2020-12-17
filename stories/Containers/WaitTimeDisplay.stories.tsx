import React from 'react';
import { WaitTimeDisplay, IWaitTimeDisplay } from '../../src/Containers/WaitTimeDisplay';
import {Meta, Story} from "@storybook/react";
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('WaitTimeDisplay'),
    component: WaitTimeDisplay,
} as Meta;

const Template: Story<IWaitTimeDisplay> = (args) => <WaitTimeDisplay {...args} />;

export const Primary = Template.bind({});

/**
 *Creates a WaitTimeDisplay component with a number
 */

Primary.args = {
    AverageWaitTime: 29,
};
