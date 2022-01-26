import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NotificationBubble, NotificationBubbleProps } from '../../index';


export default {
    title: 'Components/Other/NotificationBubble',
    component: NotificationBubble,
    args: {
        notificationCounter: 3,
    },
} as Meta;

export const Basic: Story<NotificationBubbleProps> = (args) => (
    <NotificationBubble {...args} />
);
