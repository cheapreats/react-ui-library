import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Checkbox, CheckboxProps } from '../../index';


export default {
    title: 'Components/Atoms/CheckBox',
    component: Checkbox,
    argTypes: { onChange: { action: 'Checkbox Click Occurred' } },
    args: {
        name: 'demo',
        label: 'This is a checkbox',
        value: false,
    },
} as Meta;

export const Basic: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
