import React from 'react';
export interface IVisitNotificationProps {
    maxWidth?: number;
    imgSrc: string;
    header: React.ReactElement;
    body: React.ReactElement;
    footer: React.ReactElement;
}
export declare const VisitNotification: React.FC<IVisitNotificationProps>;
