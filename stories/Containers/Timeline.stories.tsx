import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Timeline, TimelineProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { MainTheme } from '../../src/Themes';

export default {
    title: createStoryTitle('Timeline'),
    component: Timeline,
} as Meta;

const defaultArgs = {
    title: 'HARVEST',
    colorTitle: MainTheme.colors.statusColors.orange,
    subContentLeftTitle: 'MRR',
    subContentLeftAmount: 408,
    subContentRightTitle: 'Total Charges',
    subContentRightAmount: 5199,
    colorFigures: 'lightblue',
    colorText: MainTheme.colors.text,
    colorOther: '#f0f8ff',
    lengthSeparator: 365,
    data: [
        {
            color: '#7fffd4',
            font: 'icon-dollar-currency-symbol',
            text: 'Charged $4,900',
        },
        {
            color: '#ff00ff',
            font: 'icon-up-arrow',
            text: 'Upgraded to Enterprise annual plan',
        },
        {
            color: '#3366ff',
            font: 'icon-credit-card',
            text: 'Added American Express ending in 2422',
        },
        {
            color: '#7fffd4',
            font: 'icon-dollar-currency-symbol',
            text: 'Charged $299',
        },
        {
            color: '#ffddaa',
            font: 'icon-star',
            text: 'Converted their trial',
        },
    ],
};

const Template: Story<TimelineProps> = (args) => <Timeline {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
