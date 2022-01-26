import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    HorizontalBarChart,
    IHorizontalBarChartProps,
} from './HorizontalBarChart';


export default {
    title: 'Components/Analytics/Horizontal Bar Chart',
    component: HorizontalBarChart,
    args: {
        chartProperties: {
            data: [
                {
                    label: 'Today’s average Preperation Time',
                    value: 31,
                },
                {
                    label: 'Total Average Preparation Time',
                    value: 35,
                    isComparedAgainst: true,
                },
            ],
            margin: { top: 10, right: 100, bottom: 10, left: 30 },
        },
        header: 'Order Preparation Times',
        summaryHeader: 'How fast orders are being prepared',
        summaryDescription:
            'Description of how fast sadlfkj sdflkj sdlfkj sldkfj lsdkjf lskdjf ',
        unit: 'minutes',
    },
} as Meta;

export const Basic: Story<IHorizontalBarChartProps> = (args) => (
    <HorizontalBarChart {...args} />
);
