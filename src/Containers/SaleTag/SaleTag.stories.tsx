import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tag, TagProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    // Use createStoryTitle to create a storybook element SaleTag
    title: createStoryTitle('SaleTag'),
    // Show what SaleTag would look like
    component: Tag,
    args: {
        children: '$2 off',
    },
} as Meta;

export const Basic: Story<TagProps> = (args) => (
    <Tag {...args}>{args.children}</Tag>
);
