import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SmallText, SmallTextProps } from '../../index';


export default {
    title: 'Components/Text',
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
