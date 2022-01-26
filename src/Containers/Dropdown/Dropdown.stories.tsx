import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@Inputs/Button/Button';

import { IDropdownProps } from './Dropdown';
import Dropdown from './index';

export default {
    title: 'Components/Atoms/Dropdown',
    component: Dropdown,
    args: {
        dropdownWidth: 300,
        right: true,
        dropdownButton: <Button>Click me</Button>,
    },
} as Meta;

export const Basic: Story<IDropdownProps> = (args) => (
    <Dropdown {...args}>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Help Center</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
    </Dropdown>
);
export const Scrolling: Story<IDropdownProps> = (args) => (
    <Dropdown {...args}>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Help Center</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
    </Dropdown>
);
