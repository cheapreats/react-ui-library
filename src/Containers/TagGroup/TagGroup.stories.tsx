import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TagGroup, TagGroupProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('TagGroup'),
    component: TagGroup,
    args: {
        tags: [
            {children: 'Hello'},
            {children: 'Goodbye'},
            {children: 'You say goodbye and I say hello'},
            {children: 'hello hello'}
        ]
    },
} as Meta;

export const Basic: Story<TagGroupProps> = (args) => <TagGroup {...args} />

