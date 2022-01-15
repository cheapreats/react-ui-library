import React from 'react';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import {LeftRightText} from '../../Text';

export interface IPriceDetails {
    /* Name of payment */
    name: string;
    /* Price of payment */
    price: string;
    /* Styling of text */
    isBold?: boolean;
}

export interface IOrderTotalCardProps {
    /* Order price details (name, price) */
    orderCardContents: Array<IPriceDetails>;
}

export const OrderTotalCard: React.FC<IOrderTotalCardProps> = ({
    orderCardContents,
    ...props
}) => (
    <OrderCard animated={false} {...props}>
        {orderCardContents.map(({ name, price, isBold }: IPriceDetails) => (
            <PaymentText leftText={name} rightText={price} isBold={isBold} />
        ))}
    </OrderCard>
);

const OrderCard = styled(Card)``;

const PaymentText = styled(LeftRightText)<{ isBold: IPriceDetails['isBold'] }>`
    color: ${({ isBold }) => (isBold ? 'black' : 'grey')};
    font-size: ${({ isBold }) => (isBold ? '1.4em' : 'normal')};
    margin: 0.4em;
`;

export default OrderTotalCard;
