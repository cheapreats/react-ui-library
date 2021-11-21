import React from 'react';
export interface ISoldOutCardNotificationProps {
    imgSrc: string;
    header: React.ReactElement;
    footer: React.ReactElement;
    content: React.ReactElement;
    maxWidth?: number;
}
export declare const SoldOutCardNotification: React.FC<ISoldOutCardNotificationProps>;
