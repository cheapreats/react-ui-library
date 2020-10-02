import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardFill } from '@styled-icons/bootstrap/CreditCardFill';
import { Star } from '@styled-icons/evaicons-solid/Star';
import { DollarSign } from '@styled-icons/fa-solid/DollarSign';
import { ArrowUpShort } from '@styled-icons/bootstrap/ArrowUpShort';
import { MainTheme } from '../../src/Themes';
import { createStoryTitle } from '../Constants';
import { Timeline, TimelineProps } from '../../src';

export default {
    title: createStoryTitle('Timeline'),
    component: Timeline,
} as Meta;

const defaultArgs = {
    title: 'HARVEST',
    titleColor: MainTheme.colors.statusColors.orange,
    subContentLeftTitle: 'MRR',
    subContentLeftAmount: 408,
    subContentRightTitle: 'Total Charges',
    subContentRightAmount: 5199,
    figuresColor: 'lightblue',
    textColor: MainTheme.colors.text,
    separatorColor: '#f0f8ff',
    separatorLength: 365,
    data: [
        {
            color: '#7fffd4',
            Icon: DollarSign,
            text: 'Charged $4,900',
        },
        {
            color: '#ff00ff',
            Icon: ArrowUpShort,
            text: 'Upgraded to Enterprise annual plan',
        },
        {
            color: '#3366ff',
            Icon: CreditCardFill,
            text: 'Added American Express ending in 2422',
        },
        {
            color: '#7fffd4',
            Icon: DollarSign,
            text: 'Charged $299',
        },
        {
            color: '#ffddaa',
            Icon: Star,
            text: 'Converted their trial',
        },
    ],
};

const Template: Story<TimelineProps> = (args) => <Timeline {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
