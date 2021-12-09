import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Paragraph, ParagraphProps } from '../index';


export default {
    title: 'Components/Paragraph',
    component: Paragraph,
    args: {
        children: 'Hello World',
        bold: true,
        color: 'black',
    },
} as Meta;

export const Basic: Story<ParagraphProps> = (args) => (
    <Paragraph {...args}>{args.children}</Paragraph>
);
