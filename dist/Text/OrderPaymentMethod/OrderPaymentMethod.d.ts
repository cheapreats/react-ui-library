import React from 'react';
export declare enum OrderPaymentMethodTypes {
    CREDIT_CARD = "CREDIT_CARD",
    WALLET = "WALLET",
    IN_PERSON = "IN_PERSON"
}
export interface IPaymentMethodProps {
    paymentMethod: OrderPaymentMethodTypes;
}
export declare const OrderPaymentMethod: React.FC<IPaymentMethodProps>;
export default OrderPaymentMethod;
