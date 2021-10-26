import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ClickableSmallText, HighlightedString, HighlightedText, HighlightedTextProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Highlighted Text'),
    component: HighlightedText,
} as Meta;

const basicLabels: Array<HighlightedString> = [
    {
        text: 'Ordering a',
        isSpecial: false,
    },
    {
        text: 'Burger',
        isSpecial: true,
        listItemsArgs: [],
        listItemsBodies: [
            <ClickableSmallText onClick={action('Burger Clicked.')}>Burger</ClickableSmallText>, 
            <ClickableSmallText onClick={action('Fries Clicked.')}>Fries</ClickableSmallText>
        ],
    },
    {
        text: 'from',
        isSpecial: false,
    },
    {
        text: 'Wendy\'s',
        isSpecial: true,
        listItemsArgs: [],
        listItemsBodies: [
            <ClickableSmallText onClick={action('Wendy\'s Clicked.')}>{'Wendy\'s'}</ClickableSmallText>, 
            <ClickableSmallText onClick={action('Burger King Clicked.')}>Burger King</ClickableSmallText>
        ],
    },
]

const noneCaseLabels: Array<HighlightedString> = [
    {
        text: 'Ordering a',
        isSpecial: false,
    },
    {
        text: 'milkshake',
        isSpecial: false,
        
    },
]

const basicArgs = {
    labels: basicLabels,
    children: 'Header row children',
    style: {
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
    }
}

const noneCaseArgs = {
    labels: noneCaseLabels,
    children: 'Header row children',
    style: {
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
    }
}

const Template: Story<HighlightedTextProps> = (args) => <HighlightedText {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    ...basicArgs,
};

export const NoneCase = Template.bind({});
NoneCase.args = {
    ...noneCaseArgs,
}