import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { HighlightedText, HighlightedTextProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const labels = [
    {
        text: 'Ordering a',
        isSpecial: false,
    },
    {
        text: 'Burger',
        isSpecial: true,
        listArgs: {id: 'SpecialTextList'},
        listItemsArgs: [{onClick: action('Burger Clicked.'),}, {onClick: action('Fries Clicked.'),}],
        listItemsBodies: ['Burger', 'Fries'],
    },
    {
        text: 'from',
        isSpecial: false,
    },
    {
        text: 'Wendy\'s',
        isSpecial: true,
        listArgs: {id: 'SpecialTextList'},
        listItemsArgs: [{onClick: action('Wendy\'s Clicked.'),}, {onClick: action('Burger King Clicked.'),}],
        listItemsBodies: ['Wendy\'s', 'Burger King'],
    },
]

export default {
    title: createStoryTitle('Highlighted Text'),
    component: HighlightedText,
    args: {
        labels,
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
        children: 'Header row children',
    },
} as Meta;

export const Basic: Story<HighlightedTextProps> = (args) => <HighlightedText {...args} />;
