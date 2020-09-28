import React from 'react';
import { ScrollableListContent, SmallText, ScrollableListContentProps } from '../../src';
import { createStoryTitle } from "../Constants";
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Scrollable List Content'),
    component: ScrollableListContent,
    //argTypes: { onSelect: { action: imagePanelClick() } },
    args: { 
        withList: false
    },
} as Meta;

export const Basic: Story<ScrollableListContentProps> = (args) => (
        <ScrollableListContent>
            <SmallText bold>
                Text Here
            </SmallText>
        </ScrollableListContent>
);
