import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Stock, StockProps } from '../../index';


export default {
    title: 'Components/Analytics/Stock',
    component: Stock,
} as Meta;

const defaultArgs = {
    chartData: [
        { value: 10 },
        { value: 20 },
        { value: 15.2 },
        { value: 33.21 },
        { value: 30.22 },
        { value: 10.8 },
    ],
    chartColor: 'primary',
    title: 'USER GROWTH',
    figure: 4310,
    rate: -10,
    bgColor: 'border',
};

const Template: Story<StockProps> = (args) => <Stock {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
