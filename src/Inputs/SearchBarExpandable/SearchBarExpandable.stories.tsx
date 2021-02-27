import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SearchBarExpandable, SearchBarExpandableProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Search Bar Expandable'),
    component: SearchBarExpandable,
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
        placeholder: 'placeholder',
    },
} as Meta;

export const Basic: Story<SearchBarExpandableProps> = (args) => (
    <SearchBarExpandable {...args} />
);
