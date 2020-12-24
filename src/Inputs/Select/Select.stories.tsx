import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from '../../index';
import { createStoryTitle } from '../../Constants';

// TODO: ADD STATE to component

export default {
    title: createStoryTitle('Select'),
    component: Select,
    argTypes: { onChange: { action: `you selected` } },
    args: {
        description: 'description',
        name: 'name',
        placeholder: 'placeholder',
        children: [
            <option value="1">value 1</option>,
            <option value="2">value 2</option>,
            <option value="3">value 3</option>,
            <option value="4">value 4</option>,
            <option value="5">value 5</option>,
        ],
    },
} as Meta;

export const Basic: Story<SelectProps> = (args) => <Select {...args} />;

export const WithError = Basic.bind({});
WithError.args = {
    ...WithError.args,
    error: 'Error message!',
    success: false,
};

export const WithDisabled = Basic.bind({});
WithDisabled.args = {
    ...WithDisabled.args,
    disabled: true,
};
