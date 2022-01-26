import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TagGroup, TagGroupProps } from '../../index';


export default {
    title: 'Components/Molecules/TagGroup',
    component: TagGroup,
    args: {
        tags: [
            { children: 'Hello' },
            { children: 'Goodbye' },
            { children: 'You say goodbye and I say hello' },
            { children: 'hello hello' },
        ],
    },
} as Meta;

export const Basic: Story<TagGroupProps> = (args) => <TagGroup {...args} />;
