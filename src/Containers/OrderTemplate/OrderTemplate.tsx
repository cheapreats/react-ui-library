import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import { Paragraph } from '../../Text/Paragraph';
import {
    OrderPaymentMethod,
    OrderPaymentMethodTypes,
} from '../../Text/OrderPaymentMethod/OrderPaymentMethod';
import { OrderStatus, OrderStatusIdentifier } from '../OrderStatus/OrderStatus';
import { OrderType, OrderTypeIdentifier } from '../../Text/OrderType/OrderType';
import { OrderItemList } from '../OrderItemsList/OrderItemList';
import {
    OrderTotalCard,
    IOrderTotalCardProps,
} from '../OrderTotalCard/OrderTotalCard';
import { ProfileCard, ProfileCardProps } from '../ProfileCard/ProfileCard';
import { IMenuItemProps } from '../MenuItem/MenuItem';

export interface IOrderTemplateProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Order ID */
    orderId: string;
    /* Menu items in an order */
    items: Array<IMenuItemProps>;
    /* Payment method of the order (WALLET, CREDIT_CARD, etc...) */
    paymentMethod: OrderPaymentMethodTypes;
    /* status of the order (PLACED, CANCELLED, etc...) */
    status: OrderStatusIdentifier;
    /* Type of order (EAT_IN, TAKE_OUT, etc...) */
    orderType: OrderTypeIdentifier;
    /* total cost of order (fees, subtotal, tip, etc..) */
    orderCost: IOrderTotalCardProps['orderCardContents'];
    /* profile card information */
    profileDetails: ProfileCardProps;
}

export const OrderTemplate: React.FC<IOrderTemplateProps> = ({
    orderId,
    items,
    paymentMethod,
    status,
    orderType,
    orderCost,
    profileDetails,
    ...props
}): React.ReactElement => (
    <OrderContainer {...props}>
        <HeaderContianer>
            <Header
                topLeft={
                    <Paragraph size="1.4rem" bold>
                        {`Order #${orderId}`}
                    </Paragraph>
                }
                bottomLeft={
                    <OrderPaymentMethod paymentMethod={paymentMethod} />
                }
                topRight={<OrderStatus orderStatus={status} />}
                bottomRight={<OrderType orderType={orderType} />}
            />
        </HeaderContianer>
        <ProfileContainer>
            <ProfileCard {...profileDetails} />
        </ProfileContainer>
        <OrderItemsContainer>
            <OrderItemList items={items} />
        </OrderItemsContainer>
        <OrderCostContainer>
            <OrderTotalCard orderCardContents={orderCost} />
        </OrderCostContainer>
    </OrderContainer>
);

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderContianer = styled.div`
    margin-bottom: 1em;
`;

const ProfileContainer = styled.div`
    margin: 1em auto;
`;

const OrderItemsContainer = styled.div`
    margin: 1em 0;
`;

const OrderCostContainer = styled.div`
    margin-left: auto;
    width: 35%;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

export default OrderTemplate;
