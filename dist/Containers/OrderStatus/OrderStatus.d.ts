import React from 'react';
export declare enum OrderStatusIdentifier {
    PLACED = "PLACED",
    PREPARING = "PREPARING",
    PREPARED = "PREPARED",
    COMPLETE = "COMPLETE",
    CANCELLED = "CANCELLED"
}
export interface IOrderStatusProps {
    orderStatus: OrderStatusIdentifier;
}
export declare const OrderStatus: ({ orderStatus, ...props }: IOrderStatusProps) => React.ReactElement;
export default OrderStatus;
