import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@Inputs/Button/Button';
import { createStoryTitle } from '../../Constants';
import Dropdown from './index';

export default {
    title: createStoryTitle('Dropdown'),
    component: Dropdown,
} as Meta;

export const Basic: Story = (args) => (
    <Dropdown
        dropdownWidth="300px"
        dropdownButton={<Button>Click me</Button>}
    >
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Help Center</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
        <Dropdown.Item>Testing</Dropdown.Item>
    </Dropdown>
);
