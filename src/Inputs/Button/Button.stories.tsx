import React from 'react';
import { Save } from '@styled-icons/fa-solid/Save';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '../../index';
import {  getCaptionForLocale } from '../../Constants';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        disabled: false,
        primary: true,
        loading: false,
        color: 'yellow',
        icon: Save,
        iconSize: '14px',
        contentColor: 'text',
        full: false,
        children: 'hellfo',
    },
} as Meta;

export const Basic: Story<ButtonProps> = (args) => (
    <Button {...args}>{getCaptionForLocale(args.children as string)}</Button>
);
