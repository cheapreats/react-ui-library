import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MainTheme } from '@Themes';
import { Chart, ChartProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Chart'),
    component: Chart,
    args: {
        color: MainTheme.colors.primary,
        revenue: 138345,
        data: [
            { label: '17/03', value: 400 },
            { label: '18/03', value: 600 },
            { label: '19/03', value: 200 },
            { label: '20/03', value: 200 },
            { label: '21/03', value: 257 },
        ],
    },
} as Meta;

// TODO: Fix line 66 LineChart not being compiled correctly: https://github.com/recharts/recharts/issues/1057
export const Basic: Story<ChartProps> = (args) => <Chart {...args} />;
