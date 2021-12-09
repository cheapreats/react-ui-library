import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FilterBox, FilterBoxProps } from '../../index';


export default {
    title: 'Components/FilterBox',
    component: FilterBox,
    args: {
        title: 'Starts with: ',
        query: 'Emy '
    }
} as Meta;

export const Basic: Story<FilterBoxProps> = (args) => <FilterBox {...args} />;
