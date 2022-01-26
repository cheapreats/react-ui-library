import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SlidingOutPanels, SlidingOutPanelProps } from '../../index';


const images = [
    {
        id: '1',
        alt: 'Display Image',
        imageSource:
            'https://cdn.dribbble.com/users/1405795/screenshots/11465017/media/680463571eb6f82d27953d20f1627baa.png',
    },
    {
        id: '2',
        alt: 'Display Image',
        imageSource:
            'https://cdn.dribbble.com/users/1629266/screenshots/11467745/media/13c6d9bec8d0bc6ba583892f2a43cdc5.jpg',
    },
    {
        id: '3',
        alt: 'Display Image',
        imageSource:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
    },
    {
        id: '4',
        alt: 'Display Image',
        imageSource:
            'https://cdn.dribbble.com/users/255/screenshots/11445792/media/6083d5496c6b6ba70805d9e0a60b718a.png',
    },
];

export default {
    title: 'Marketing Website/Sliding Out Panels',
    component: SlidingOutPanels,
    argTypes: { onClick: { action: 'Clicked' } },
    args: {
        images,
    },
} as Meta;

export const Basic: Story<SlidingOutPanelProps> = (args) => (
    <SlidingOutPanels {...args} />
);
