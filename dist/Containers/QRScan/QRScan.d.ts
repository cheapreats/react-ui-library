import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface QRScanProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    footerItems?: React.ReactNode[] | React.ReactNode;
    middleItems?: React.ReactNode[] | React.ReactNode;
    title?: string;
    qrDisplay?: React.ReactNode;
    qrRightContent?: React.ReactNode;
}
export declare const QRScan: React.FC<QRScanProps>;
