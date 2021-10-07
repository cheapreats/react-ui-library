import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ClickableSmallText, SmallTextProps } from '../index';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Clickable Text'),
    component: ClickableSmallText,
    args: {
        children: 'Hello World',
        bold: true,
        color: 'black',
        onClick: function () {
            console.log('Hello World')
        },
    },
} as Meta;

export const Basic: Story<SmallTextProps> = (args) => (
    <ClickableSmallText {...args}>{args.children}</ClickableSmallText>
);
