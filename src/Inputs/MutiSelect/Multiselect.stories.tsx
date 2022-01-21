import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MultiSelect, MultiSelectItem, MultiSelectProps } from '../../index';


export default {
    title: 'Components/Multi Select',
    component: MultiSelect,
    args: {
        name: 'Demo',
        label: 'label',
        description: 'Description',
    },
} as Meta;

export const Basic: Story<MultiSelectProps> = (args) => (
    <MultiSelect {...args}>
        <MultiSelectItem>Banana</MultiSelectItem>
        <MultiSelectItem>Banana</MultiSelectItem>
        <MultiSelectItem>Banana</MultiSelectItem>
    </MultiSelect>
);

export const WithColumns = Basic.bind({});
WithColumns.args = {
    ...WithColumns.args,
    columns: 3,
};
