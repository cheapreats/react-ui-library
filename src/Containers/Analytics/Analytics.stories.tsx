import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Analytics, IAnalyticsProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Analytics'),
    component: Analytics,
    args: {
        title: "Delivered",
        value: 128,
    },
} as Meta;

export const Basic: Story<IAnalyticsProps> = (args) => <Analytics {...args} />;
