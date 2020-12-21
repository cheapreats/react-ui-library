import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ColorPicker, ColorPickerProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Color picker'),
    component: ColorPicker,
    argTypes: { onChange: { action: 'Color changed' } },
    args: {
        value: '#ff0000',
    },
} as Meta;

export const Basic: Story<ColorPickerProps> = (args) => (
    <ColorPicker {...args} />
);
