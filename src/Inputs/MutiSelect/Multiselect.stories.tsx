import React from 'react';
import {
    MultiSelect,
    MultiSelectItem,
    MultiSelectProps,
    MultiSelectItemProps,
} from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Multi Select'),
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
