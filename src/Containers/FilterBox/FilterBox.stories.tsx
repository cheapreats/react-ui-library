import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FilterBox, FilterBoxProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('FilterBox'),
    component: FilterBox,
    args: {
        title: 'Starts with: ',
        query: 'Emy '
    }
} as Meta;

export const Basic: Story<FilterBoxProps> = (args) => <FilterBox {...args} />;
