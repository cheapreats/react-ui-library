import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SmallText, SmallTextProps } from '../index';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Text'),
    component: SmallText,
    args: {
        children: 'Hello World',
        bold: true,
        color: 'black',
    },
} as Meta;

export const Basic: Story<SmallTextProps> = (args) => (
    <SmallText {...args}>{args.children}</SmallText>
);
