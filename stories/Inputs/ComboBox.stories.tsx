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
    },
} as Meta;

export const Basic: Story<ComboBoxSelectorProps> = (args) => (
    <ComboBox {...args}></ComboBox>
)
