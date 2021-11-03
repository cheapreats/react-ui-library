import React from 'react';
import styled from 'styled-components';
import { PlaneDeparture } from '@styled-icons/fa-solid/PlaneDeparture';
import { Utensils } from '@styled-icons/fa-solid/Utensils';
import { Paragraph } from '../Paragraph';

const PLANE_ICON = PlaneDeparture;
const UTENSILS_ICON = Utensils;

export enum OrderTypeIdentifier {
    EAT_IN = 'EAT_IN',
    TAKE_OUT = 'TAKE_OUT',
    DELIVERY = 'DELIVERY',
    SELF_DELIVERY = 'SELF_DELIVERY',
}

const orderTypes = {
    EAT_IN: 'Eat In',
    TAKE_OUT: 'Take Out',
    DELIVERY: 'Delivery',
    SELF_DELIVERY: 'Self Delivery',
};

interface IOrderIconProps {
    /* Type of order (EAT_IN, TAKE_OUT, DELIVERY, SELF_DELIVERY) */
    orderType: string;
}

export const OrderType: React.FC<IOrderIconProps> = ({
    orderType,
    ...props
}): React.ReactElement => {
    /* Returns order type with no underscores */
    const handleOrderType = () => {
        switch (orderType) {
            case OrderTypeIdentifier.EAT_IN:
                return orderTypes.EAT_IN;
            case OrderTypeIdentifier.TAKE_OUT:
                return orderTypes.TAKE_OUT;
            case OrderTypeIdentifier.SELF_DELIVERY:
                return orderTypes.SELF_DELIVERY;
            case OrderTypeIdentifier.DELIVERY:
                return orderTypes.DELIVERY;
            default:
                return 'Unknown';
        }
    };

    /* Icon displayed depending on order type */
    const handleOrderTypeIcon = () =>
        orderType === OrderTypeIdentifier.TAKE_OUT ? PLANE_ICON : UTENSILS_ICON;

    return (
        <IconParagraph {...props}>
            <Icon as={handleOrderTypeIcon()} />
            {handleOrderType()}
        </IconParagraph>
    );
};

const IconParagraph = styled(Paragraph)`
    font-size: 1.4rem;
    margin: -5px 0 0;
    font-weight: bold;
    text-align: right;
`;

const Icon = styled.svg`
    width: 14px;
    margin-right: 7px;
`;

export default OrderType;
