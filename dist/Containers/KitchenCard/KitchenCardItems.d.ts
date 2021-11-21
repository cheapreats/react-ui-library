import React from 'react';
import { ResponsiveInterface, MainInterface } from '../../Utils/BaseStyles';
import { OrderItem } from './constants';
export interface KitchenCardItemsProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    items: OrderItem[];
    isFullName: boolean;
}
export declare const KitchenCardItems: React.FC<KitchenCardItemsProps>;
