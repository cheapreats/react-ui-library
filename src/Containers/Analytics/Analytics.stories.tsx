import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Analytics, IAnalyticsProps } from '../../index';

export default {
    title: 'Components/Analytics',
    component: Analytics,
    args: {
        title: 'Delivered',
        value: 128,
    },
} as Meta;

export const Basic: Story<IAnalyticsProps> = (args) => <Analytics {...args} />;
