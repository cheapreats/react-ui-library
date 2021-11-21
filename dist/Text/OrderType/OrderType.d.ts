import React from 'react';
export declare enum OrderTypeIdentifier {
    EAT_IN = "EAT_IN",
    TAKE_OUT = "TAKE_OUT",
    DELIVERY = "DELIVERY",
    SELF_DELIVERY = "SELF_DELIVERY"
}
export interface IOrderTypeProps {
    orderType: OrderTypeIdentifier;
}
export declare const OrderType: React.FC<IOrderTypeProps>;
export default OrderType;
