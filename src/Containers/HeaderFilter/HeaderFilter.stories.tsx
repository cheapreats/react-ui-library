import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HeaderFilter, IHeaderFilterProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Header Filter'),
    component: HeaderFilter,
    args: {
        header: "Categories",
        items: ["All Categories", "Bedroom", "Cafe", "Office", "Kitchen"]
    },
} as Meta;

export const Basic: Story<IHeaderFilterProps> = (args) => <HeaderFilter {...args} />;
