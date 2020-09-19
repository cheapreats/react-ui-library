import React from 'react';
import { Save } from '@styled-icons/fa-solid/Save';
import {Button, ButtonProps} from '../../src';
import {createStoryTitle} from "../Constants";
import {Meta, Story} from "@storybook/react";

export default {
    title: createStoryTitle('Button'),
    component: Button,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        disabled: false,
        primary: true,
        loading: false,
        color: 'primary',
        icon: Save,
        full: false,
        children: 'Normal Button',
    }
} as Meta;

export const Basic: Story<ButtonProps>  = (args) => <Button {...args}>{args.children}</Button>;