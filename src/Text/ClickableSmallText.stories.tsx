import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ClickableSmallText, SmallTextProps } from '../index';


export default {
    title: 'Components/Clickable Text',
    component: ClickableSmallText,
    args: {
        children: 'Hello World',
        bold: true,
        color: 'black',
    },
    argTypes: { onClick: { action: 'Highlighted Text was clicked.' } },
} as Meta;

export const Basic: Story<SmallTextProps> = (args) => (
    <ClickableSmallText {...args}>{args.children}</ClickableSmallText>
);
