import React from 'react';
import {Tag, TagProps} from '../../src';
import {createStoryTitle} from "../Constants";
import {Meta, Story} from "@storybook/react";

export default {
    title: createStoryTitle('Tag'),
    component: Tag,
    args: {
        children: 'Hello'
    }
} as Meta;

export const Basic: Story<TagProps>  = (args) => <Tag {...args}>{args.children}</Tag>;