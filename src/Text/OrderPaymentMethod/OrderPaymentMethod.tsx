import React from 'react';
import { Paragraph } from '@Text/Paragraph';

const UNDERSCORE_REGEX = /(^|_)./g;

export enum OrderPaymentMethodTypes {
    CREDIT_CARD = 'CREDIT_CARD',
    WALLET = 'WALLET',
    IN_PERSON = 'IN_PERSON',
}

export interface IPaymentMethodProps {
    /* Type of payment (Credit card, wallet, in person) */
    paymentMethod: OrderPaymentMethodTypes;
}

export const OrderPaymentMethod: React.FC<IPaymentMethodProps> = ({
    paymentMethod,
    ...props
}) => {
    /* Gets rid of underscore and uppercase text in a word */
    const formatText = (text: OrderPaymentMethodTypes): string =>
        text
            .toLowerCase()
            .replace(UNDERSCORE_REGEX, (e) =>
                e.toUpperCase().replace('_', ' '),
            );

    /* Returns payment method with no underscores */
    const handlePaymentMethod = (): string => {
        switch (paymentMethod) {
            case OrderPaymentMethodTypes.CREDIT_CARD:
                return formatText(OrderPaymentMethodTypes.CREDIT_CARD);
            case OrderPaymentMethodTypes.WALLET:
                return formatText(OrderPaymentMethodTypes.WALLET);
            case OrderPaymentMethodTypes.IN_PERSON:
                return formatText(OrderPaymentMethodTypes.IN_PERSON);
            default:
                return 'Unknown';
        }
    };

    return (
        <Paragraph bold size="1.4rem" {...props}>
            {handlePaymentMethod()}
        </Paragraph>
    );
};

export default OrderPaymentMethod;
