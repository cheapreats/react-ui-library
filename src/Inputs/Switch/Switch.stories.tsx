import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Switch, SwitchProps } from '../../index';


export default {
    title: 'Components/Switch',
    component: Switch,
    args: {
        label: 'label',
        description: 'description',
    },
} as Meta;

export const Basic: Story<SwitchProps> = (args) => <Switch {...args} />;

export const WithTags = Basic.bind({});
WithTags.args = {
    ...WithTags.args,
    leftTag: 'I am the left tag',
    rightTag: 'And I am the right tag',
};

export const WithDisabled = Basic.bind({});
WithDisabled.args = {
    ...WithDisabled.args,
    disabled: true,
};

export const WithActiveColor = Basic.bind({});
WithActiveColor.args = {
    ...WithActiveColor.args,
    leftTag: 'Off',
    rightTag: 'On',
    activeColor: '#0000FF',
};

export const WithSwitchColor = Basic.bind({});
WithSwitchColor.args = {
    ...WithSwitchColor.args,
    leftTag: 'On',
    rightTag: 'Off',
    switchColor: '#ff8c00',
};

export const WithBoth = Basic.bind({});
WithBoth.args = {
    ...WithBoth.args,
    leftTag: 'On',
    rightTag: 'Off',
    switchColor: '#ff8c00',
    activeColor: '#0000FF',
};
