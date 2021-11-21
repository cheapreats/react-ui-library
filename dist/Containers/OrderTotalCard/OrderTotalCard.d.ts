import React from 'react';
export interface IPriceDetails {
    name: string;
    price: string;
    isBold?: boolean;
}
export interface IOrderTotalCardProps {
    orderCardContents: Array<IPriceDetails>;
}
export declare const OrderTotalCard: React.FC<IOrderTotalCardProps>;
export default OrderTotalCard;
