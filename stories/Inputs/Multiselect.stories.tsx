import React from 'react';
import {
    MultiSelect,
    MultiSelectItem,
    MultiSelectProps,
    MultiSelectItemProps,
} from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Multi Select'),
    component: MultiSelect,
    args: {
        name: 'Demo',
    },
} as Meta;

export const Basic: Story<MultiSelectItemProps> = (args) => (
    <MultiSelect label={'label'} description={'Description'}>
        <MultiSelectItem {...args}>Banana</MultiSelectItem>
        <MultiSelectItem {...args}>Banana</MultiSelectItem>
        <MultiSelectItem {...args}>Banana</MultiSelectItem>
    </MultiSelect>
);

export const WithColumns = Basic.bind({});
WithColumns.args = {
    ...WithColumns.args,
    columns: 3,
};
