import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '@Inputs/Button/Button';
import {SearchableDropdown, SearchableDropdownProps} from "@Inputs/SearchableDropDown/SearchableDropdown";



export default {
    title: 'Components/SearchableDropdown',
    component: SearchableDropdown,
    argTypes: {
        onChange: {
            action: {
                type: 'string',
            },
        },
        onInput: {
            action: {
                type: 'string',
            },
        },
    },
    args: {
        placeholder:'Search',
        dropdownButton: <Button>Click me</Button>,
        dropdownWidth: 300,
        label: 'label',
        name: 'name',
        children: [
            <option value="a">CEM-2609</option>,
            <option value="b">CEM-2601</option>,
            <option value="c">CEM-2602</option>,
            <option value="d">CEM-2589</option>,
            <option value="e">CEM-2611</option>,
            <option value="a">CEM-2792</option>,
            <option value="b">CEM-2600</option>,
            <option value="c">CEM-2610</option>,
            <option value="d">CEM-2603</option>,
            <option value="e">CEM-2604</option>,
        ],
    },
} as Meta;

export const Basic: Story<SearchableDropdownProps> = (args) => (
    <SearchableDropdown {...args} />
);