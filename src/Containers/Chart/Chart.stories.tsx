import React from 'react';
import { Chart, ChartProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';
import { MainTheme } from '@Themes';

export default {
    title: createStoryTitle('Chart'),
    component: Chart,
} as Meta;

const defaultArgs = {
    color: MainTheme.colors.primary,
    revenue: 138345,
    data: [
        { label: '17/03', value: 400 },
        { label: '18/03', value: 600 },
        { label: '19/03', value: 200 },
        { label: '20/03', value: 200 },
        { label: '21/03', value: 257 },
    ],
};

const Template: Story<ChartProps> = (args) => <Chart {...args}></Chart>;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
