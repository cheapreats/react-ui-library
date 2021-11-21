import React from 'react';
import { StatusColors } from '../Status/Status';
import { OrderItem } from './constants';
export interface KitchenCardProps {
    customer: {
        name: string;
    };
    _id: string;
    items: OrderItem[];
    orderType: string;
    statusColor: StatusColors;
    status: string;
    index: number;
    isFullName?: boolean;
    cardHeight?: number;
    cardWidth: number;
    cardMargin: number;
    TimeComponent: React.ReactNode | string;
    StatusModifierComponent: React.ReactNode | string;
}
export declare const KitchenCard: React.FC<KitchenCardProps>;
