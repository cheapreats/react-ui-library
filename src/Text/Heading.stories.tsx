import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Heading, HeadingProps } from '../index';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Headings'),
    component: Heading,
    args: {
        children: 'Hello World',
        bold: true,
        color: 'black',
        type: 'h1',
    },
} as Meta;

export const Basic: Story<HeadingProps> = (args) => (
    <Heading {...args}>{args.children}</Heading>
);
