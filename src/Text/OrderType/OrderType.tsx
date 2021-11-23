import React from 'react';
import styled from 'styled-components';
import { PlaneDeparture } from '@styled-icons/fa-solid/PlaneDeparture';
import { Utensils } from '@styled-icons/fa-solid/Utensils';
import { Paragraph } from '../Paragraph';

const PLANE_ICON = PlaneDeparture;
const UTENSILS_ICON = Utensils;
const UNDERSCORE_REGEX = /(^|_)./g;

export enum OrderTypeIdentifier {
    EAT_IN = 'EAT_IN',
    TAKE_OUT = 'TAKE_OUT',
    DELIVERY = 'DELIVERY',
    SELF_DELIVERY = 'SELF_DELIVERY',
}

export interface IOrderTypeProps {
    /* Type of order (EAT_IN, TAKE_OUT, DELIVERY, SELF_DELIVERY) */
    orderType: OrderTypeIdentifier;
}

export const OrderType: React.FC<IOrderTypeProps> = ({
    orderType,
    ...props
}): React.ReactElement => {
    /* Gets rid of underscore and uppercase text in a word */
    const formatText = (text: OrderTypeIdentifier): string =>
        text
            .toLowerCase()
            .replace(UNDERSCORE_REGEX, (e) =>
                e.toUpperCase().replace('_', ' '),
            );

    /* Returns order type with no underscores */
    const handleOrderType = (): string => {
        switch (orderType) {
        case OrderTypeIdentifier.EAT_IN:
            return formatText(OrderTypeIdentifier.EAT_IN);
        case OrderTypeIdentifier.TAKE_OUT:
            return formatText(OrderTypeIdentifier.TAKE_OUT);
        case OrderTypeIdentifier.SELF_DELIVERY:
            return formatText(OrderTypeIdentifier.SELF_DELIVERY);
        case OrderTypeIdentifier.DELIVERY:
            return formatText(OrderTypeIdentifier.DELIVERY);
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
`;

const Icon = styled.svg`
    width: 14px;
    margin-right: 7px;
`;

export default OrderType;
