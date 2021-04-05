import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ComboBox, ComboBoxSelectorProps } from '../../index';
import { createStoryTitle } from '../../Constants';

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
        children: [
            <option value='a'>$10</option>,
            <option value='b'>$10-$20</option>,
            <option value='c'>$20-$30</option>,
            <option value='d'>$30-$40</option>,
            <option value='e'>$40+</option>,
        ],
    },
} as Meta;

export const Basic: Story<ComboBoxSelectorProps> = (args) => (
    <ComboBox {...args} />
);
