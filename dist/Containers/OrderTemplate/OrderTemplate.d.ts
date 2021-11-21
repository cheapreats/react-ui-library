import React from 'react';
import { OrderPaymentMethodTypes } from '../../Text/OrderPaymentMethod/OrderPaymentMethod';
import { OrderStatusIdentifier } from '../OrderStatus/OrderStatus';
import { OrderTypeIdentifier } from '../../Text/OrderType/OrderType';
import { IOrderTotalCardProps } from '../OrderTotalCard/OrderTotalCard';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { IMenuItemProps } from '../MenuItem/MenuItem';
export interface IOrderTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    orderId: string;
    items: Array<IMenuItemProps>;
    paymentMethod: OrderPaymentMethodTypes;
    status: OrderStatusIdentifier;
    orderType: OrderTypeIdentifier;
    orderCost: IOrderTotalCardProps['orderCardContents'];
    profileDetails: ProfileCardProps;
}
export declare const OrderTemplate: React.FC<IOrderTemplateProps>;
export default OrderTemplate;
