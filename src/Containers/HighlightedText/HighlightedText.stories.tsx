import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HighlightedText, HighlightedTextProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const printChoice = (choiceName: string) => {
    console.log(`You chose ` + choiceName + `.`)
}

const labels = [
    {
        text: 'Ordering a',
        isSpecial: false,
    },
    {
        text: 'Burger',
        isSpecial: true,
        // onClick: () => console.log(`You clicked.`),
        listArgs: {id: 'SpecialTextList'},
        listItemsArgs: [{onClick: () => printChoice(`Burger`),}, {onClick: () => printChoice(`Fries`),}],
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
        listItemsArgs: [{onClick: () => printChoice(`Wendy\'s`),}, {onClick: () => printChoice(`Burger King`),}],
        listItemsBodies: ['Wendy\'s', 'Burger King'],
    },
]



export default {
    title: createStoryTitle('Highlighted Text'),
    component: HighlightedText,
    args: {
        labels: labels,
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
        children: 'Header row children',
    },
} as Meta;

export const Basic: Story<HighlightedTextProps> = (args) => <HighlightedText {...args} />;
