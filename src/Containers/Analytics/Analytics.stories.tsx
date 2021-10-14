import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Analytics, AnalyticsProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Analytics'),
    component: Analytics,
    args: {
        title: "Test",
        value: 10,
        change: .5
    },
} as Meta;

export const Basic: Story<AnalyticsProps> = (args) => <Analytics {...args} />;