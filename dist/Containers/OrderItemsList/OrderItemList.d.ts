import React from 'react';
import { IMenuItemProps } from '../MenuItem/MenuItem';
export interface IOrderItems extends React.HTMLAttributes<HTMLDivElement> {
    items: Array<IMenuItemProps>;
}
export declare const OrderItemList: ({ items, ...props }: IOrderItems) => React.ReactElement;
export default OrderItemList;
