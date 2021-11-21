import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Paragraph } from '../Paragraph';

const ORDERID_SLICE = 4;

export interface IOrderIDProps {
    /* Order ID number */
    orderId: string;
}

export const OrderID: React.FC<IOrderIDProps> = ({ orderId, ...props }) => {
    const id = useCallback(
        () => orderId.slice(orderId.length - ORDERID_SLICE),
        [orderId],
    );

    return <OrderIDText {...props}> Order #{id()} </OrderIDText>;
};

const OrderIDText = styled(Paragraph)`
    font-size: 1.4rem;
    font-weight: bold;
`;

export default OrderID;
