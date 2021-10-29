import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ClickableSmallText, HighlightedString, HighlightedText, HighlightedTextProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const labels: Array<HighlightedString> = [
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

export default {
    title: createStoryTitle('Highlighted Text'),
    component: HighlightedText,
    args: {
        labels,
        children: 'Header row children',
        style: {
            display: 'column',
            type: 'h2',
            padding: '0 0 0 5px',
            width: 200,
        }
    },
} as Meta;

export const Basic: Story<HighlightedTextProps> = (args) => <HighlightedText {...args} />;

export const OldText = Basic.bind({});
OldText.args = {
    ...OldText.args,
    labels:
    [
        {
            text: 'Ordering a',
            isSpecial: false,
            overrideAge: false,
        },
        {
            text: 'Burger',
            isSpecial: true,
            listItemsArgs: [],
            listItemsBodies: [
                <ClickableSmallText onClick={action('Burger Clicked.')}>Burger</ClickableSmallText>, 
                <ClickableSmallText onClick={action('Fries Clicked.')}>Fries</ClickableSmallText>
            ],
            overrideAge: false,
        },
    ],
};

export const BothText = Basic.bind({});
BothText.args = {
    ...BothText.args,
    labels:
    [
        {
            text: 'Welcome to Burger Barn.',
            isSpecial: false,
            overrideAge: false,
        },
        {
            text: 'Would you like a ',
            isSpecial: false,
            overrideAge: true,
        },
        {
            text: 'Burger',
            isSpecial: true,
            listItemsArgs: [],
            listItemsBodies: [
                <ClickableSmallText onClick={action('Burger Clicked.')}>Burger</ClickableSmallText>, 
                <ClickableSmallText onClick={action('Fries Clicked.')}>Fries</ClickableSmallText>
            ],
            overrideAge: true,
        },
    ],
};

