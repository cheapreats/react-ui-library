import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NotificationBubble, NotificationBubbleProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('NotificationBubble'),
    component: NotificationBubble,
    args: {
        notificationCounter: 3,
    },
} as Meta;

export const Basic: Story<NotificationBubbleProps> = (args) => (
    <NotificationBubble {...args} />
);
