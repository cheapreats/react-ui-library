import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    ScrollableListContent,
    SmallText,
    ScrollableListContentProps,
} from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Scrollable List Content'),
    component: ScrollableListContent,
    args: {
        withList: false,
        bold: true,
    },
} as Meta;

export const Basic: Story<ScrollableListContentProps> = (args) => (
    <ScrollableListContent {...args}>
        <SmallText {...args}>Text Here</SmallText>
    </ScrollableListContent>
);
