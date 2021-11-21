import React from 'react';
export interface NotificationBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    notificationCounter: number;
    badgeProps?: React.HTMLAttributes<HTMLDivElement>;
}
export declare const NotificationBubble: React.FC<NotificationBubbleProps>;
