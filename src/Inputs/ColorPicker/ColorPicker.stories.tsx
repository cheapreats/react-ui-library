import React, { useState } from 'react';
import { ColorPicker, ColorPickerProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Color picker'),
    component: ColorPicker,
    argTypes: { onChange: { action: 'Color changed' } },
    args: {
        value: '#ff0000',
    },
} as Meta;

export const Basic: Story<ColorPickerProps> = (args) => (
    <ColorPicker {...args}></ColorPicker>
);
