import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HorizontalScrollList, ScrollListProps } from '../../index';


const exampleHoveredStyle = () => `
    color: red;
`;

const exampleSelectedStyle = () => `
    color: red;
    font-weight: bold;
`;

const exampleLabelArray = [
    'fruit',
    'burgers',
    'drinks',
    'steak',
    'pizza',
    'desserts',
    'appetizers',
    'entrées',
    'snacks',
];

export default {
    title: 'Components/Horizontal Scroll List',
    component: HorizontalScrollList,
    args: {
        labelArray: exampleLabelArray,
        menuName: 'Name of Menu',
        hoveredStyle: exampleHoveredStyle,
        selectedStyle: exampleSelectedStyle,
        menuWidth: 'Fix Dropdown Menu Width',
        displaySelected: true,
        displayDropDown: true,
    },
} as Meta;

export const Basic: Story<ScrollListProps> = (args) => (
    <HorizontalScrollList {...args} />
);
