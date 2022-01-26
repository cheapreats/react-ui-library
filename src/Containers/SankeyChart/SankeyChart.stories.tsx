import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SankeyChart, ISankeyChartProps } from './SankeyChart';


export default {
    title: 'Components/Analytics/SankeyChart',
    component: SankeyChart,
    args: {
        width: 600,
        height: 300,
        data: {
            nodes: [
                {
                    name: 'Visit',
                },
                {
                    name: 'Direct-Favourite',
                },
                {
                    name: 'Page-Click',
                },
                {
                    name: 'Detail-Favourite',
                },
                {
                    name: 'Lost',
                },
            ],
            links: [
                {
                    source: 0,
                    target: 1,
                    value: 3728,
                },
                {
                    source: 0,
                    target: 2,
                    value: 354170,
                },
                {
                    source: 2,
                    target: 3,
                    value: 62429,
                },
                {
                    source: 2,
                    target: 4,
                    value: 291741,
                },
            ],
        },
    },
} as Meta;

export const Basic: Story<ISankeyChartProps> = (args) => (
    <SankeyChart {...args} />
);

export const WithNodePadding = Basic.bind({});

WithNodePadding.args = {
    ...WithNodePadding.args,
    nodePadding: 50,
};

export const WithMargin = Basic.bind({});

WithMargin.args = {
    ...WithMargin.args,
    margin: { top: 50, right: 50, left: 50, bottom: 50 },
};

export const Perfect = Basic.bind({});

Perfect.args = {
    ...Perfect.args,
    nodePadding: 50,
    margin: { top: 10, right: 150, bottom: 30, left: 10 },
};

export const Colors = Perfect.bind({});

Colors.args = {
    ...Colors.args,
    nodeColor: '#fafafa',
    linkColor: '#333',
};

export const Visited = Basic.bind({});

Visited.args = {
    ...Visited.args,
    nodePadding: 50,
    margin: { top: 10, right: 150, bottom: 30, left: 10 },
    data: {
        nodes: [
            {
                name: 'Visits',
            },
            {
                name: 'Purchased',
            },
            {
                name: 'Left',
            },
            {
                name: 'come back again',
            },
            {
                name: 'did not come back',
            },
        ],
        links: [
            {
                source: 0,
                target: 1,
                value: 50,
            },
            {
                source: 0,
                target: 2,
                value: 49,
            },
            {
                source: 1,
                target: 3,
                value: 25,
            },
            {
                source: 1,
                target: 4,
                value: 25,
            },
        ],
    },
};
