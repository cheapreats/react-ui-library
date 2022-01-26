import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tag, TagProps } from '../../index';


export default {
    title: 'Components/Atoms/Tag',
    component: Tag,
    args: {
        children: 'Hello',
    },
} as Meta;

export const Basic: Story<TagProps> = (args) => (
    <Tag {...args}>{args.children}</Tag>
);
