import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Analytics, AnalyticsProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Analytics'),
    component: Analytics,
    args: {
        title: "Delivered",
        value: 128,
        change: -3.0
    },
} as Meta;

export const Basic: Story<AnalyticsProps> = (args) => <Analytics {...args} />;