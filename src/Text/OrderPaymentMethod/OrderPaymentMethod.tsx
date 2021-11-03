import React from 'react';
import { Paragraph } from '@Text/Paragraph';

export enum OrderPaymentMethodTypes {
    CREDIT_CARD = 'CREDIT_CARD',
    WALLET = 'WALLET',
    IN_PERSON = 'IN_PERSON',
}

const paymentType = {
    CREDIT_CARD: 'Credit Card',
    WALLET: 'Wallet',
    IN_PERSON: 'In Person',
};

interface PaymentMethodProps {
    /* Type of payment (Credit card, wallet, in person) */
    paymentMethod: string;
}

export const OrderPaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMethod,
    ...props
}) => {
    /* Returns payment method with no underscores */
    const handlePaymentMethod = () => {
        switch (paymentMethod) {
            case OrderPaymentMethodTypes.CREDIT_CARD:
                return paymentType.CREDIT_CARD;
            case OrderPaymentMethodTypes.WALLET:
                return paymentType.WALLET;
            case OrderPaymentMethodTypes.IN_PERSON:
                return paymentType.IN_PERSON;
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
