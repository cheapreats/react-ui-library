import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SpecialText, SpecialTextProps } from '../index';

export default {
    title: 'Components/SpecialText',
    component: SpecialText,
    argTypes: { onClick: { action: 'SpecialText Click Occurred' } },
    args: {
        children: 'Special Text',
    },
} as Meta;

export const Basic: Story<SpecialTextProps> = (args) => (
    <span>This is <SpecialText {...args} /></span>
);