import React from 'react';
import styled from 'styled-components';
import {Bell} from '@styled-icons/boxicons-solid'

export interface NotificationBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    notificationCounter: number;
    badgeProps?: React.HTMLAttributes<HTMLDivElement>;
}

/* Max number shown on badge */
const MaxNumberShown = 9;

export const NotificationBubble: React.FC<NotificationBubbleProps> = ({
    /* Notification prop passed in */
    notificationCounter,
    badgeProps,
    ...props
}): React.ReactElement => (
    <div {...props}>
        <NotificationBell/>
        <Badge notificationCounter={notificationCounter} {...badgeProps}>
            <b>{notificationCounter > MaxNumberShown ? '9+' : notificationCounter}</b>
        </Badge>

    </div>

);

const Badge = styled.div<NotificationBubbleProps>`

display: ${({ notificationCounter }): string => (notificationCounter ? 'block' : 'none')};

font-family: Arial, Helvetica, sans-serif;

background-color: red;
font-size: 11px;
color: white;
text-align: center;
width: 14px;
height: 14px;
border-radius: 50%;
position: relative;
bottom: 37px;
left: 13px;
border: 3px solid red;

`;

const NotificationBell = styled(Bell)`

    height: 32px;
    width: 32px;
    color: gray;

`;