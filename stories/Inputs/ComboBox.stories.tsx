import React from 'react';
import { ComboBox, ComboBoxSelectorProps } from '../../src';
import { createStoryTitle } from "../Constants";
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Combo box'),
    component: ComboBox,
    argTypes: { onChange: { action: 'Changed' } },
    args: {
        value: 'value',
        limit: 5,
        placeholder: 'placeholder',
        label: 'label',
        name: 'name',
    },
} as Meta;

export const Basic: Story<ComboBoxSelectorProps> = (args) => (
    <ComboBox {...args}>
        <option>children 1</option>
        <option>children 2</option>
        <option>children 3</option>
    </ComboBox>
)
