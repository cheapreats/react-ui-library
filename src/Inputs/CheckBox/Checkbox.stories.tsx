import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Checkbox, CheckboxProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CheckBox'),
    component: Checkbox,
    argTypes: { onChange: { action: 'Checkbox Click Occurred' } },
    args: {
        name: 'demo',
        label: 'This is a checkbox',
        value: false,
    },
} as Meta;

export const Basic: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
