import React from 'react';
import styled from 'styled-components';
import { Bell } from '@styled-icons/boxicons-solid';

/* Max number shown on badge */
const MAX_NUMBER_SHOWN = 9;

export interface NotificationBubbleProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Number of notifications passed in */
    notificationCounter: number;
    /* Passed in props to modify the divs */
    badgeProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const NotificationBubble: React.FC<NotificationBubbleProps> = ({
    /* Notification prop passed in */
    notificationCounter,
    badgeProps,
    ...props
}): React.ReactElement => {
    /**
     * Takes in the notifications and transforms it to the displayed notification badge number
     * @param notifications {number} - the number of notifications
     * @returns {string} - the number of notifications displayed to the user in the badge
     */
    const getNotificationCount = (notifications: number) => {
        if (notifications < 1) {
            notificationCounter = 0;
        } else if (notifications > MAX_NUMBER_SHOWN) {
            return '9+';
        }
        return notificationCounter;
    };

    return (
        <div {...props}>
            <NotificationBell />
            <Badge notificationCounter={notificationCounter} {...badgeProps}>
                <b>{getNotificationCount(notificationCounter)}</b>
            </Badge>
        </div>
    );
};

const Badge = styled.div<NotificationBubbleProps>`
    display: ${({ notificationCounter }): string =>
        notificationCounter ? 'block' : 'none'};

    ${({ theme }) => `
        border: 3px solid ${theme.colors.statusColors.red};
        background-color: ${theme.colors.statusColors.red};
        color:${theme.colors.input.default};
    `}

    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    text-align: center;
    width: 14px;
    border-radius: 50%;
    position: relative;
    bottom: 37px;
    left: 13px;
`;

const NotificationBell = styled(Bell)`
    ${({ theme }) => `
        color:${theme.colors.text};
    `}

    height: 32px;
    width: 32px;
    color: gray;
`;
