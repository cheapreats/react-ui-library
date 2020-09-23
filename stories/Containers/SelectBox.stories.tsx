import React, { useState } from 'react';
import { SelectBox,SelectBoxProps, Select } from '../../src';
import {createStoryTitle} from "../Constants";
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Select Box'),
    component: SelectBox,
    args: {
        isSelected: false,
        onSelect: false,
    },
} as Meta;

export const Basic: Story<SelectBoxProps> = (args) => (
    <SelectBox {...args}>
    Hello
    </SelectBox>
);