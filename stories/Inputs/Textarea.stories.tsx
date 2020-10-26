import React from 'react';
import { Textarea, TextareaProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Text area'),
    component: Textarea,
    args: {
        placeholder: 'placeholder',
        rows: 5,
        disabled: false,
    },
} as Meta;

export const Basic: Story<TextareaProps> = (args) => (
    <Textarea {...args}></Textarea>
);

export const WithSuccess = Basic.bind({});
WithSuccess.args = {
    ...WithSuccess.args,
    success: true,
};

export const WithError = Basic.bind({});
WithError.args = {
    ...WithError.args,
    error: 'Oops! Error message!',
};

export const Disabled = Basic.bind({});
Disabled.args = {
    ...Disabled.args,
    disabled: true,
};
