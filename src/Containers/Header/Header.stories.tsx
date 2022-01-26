import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    OrderStatus,
    OrderStatusIdentifier,
} from '@Containers/OrderStatus/OrderStatus';
import { OrderID } from '@Text/OrderID/OrderID';
import { OrderType, OrderTypeIdentifier } from '@Text/OrderType/OrderType';
import {
    OrderPaymentMethod,
    OrderPaymentMethodTypes,
} from '@Text/OrderPaymentMethod/OrderPaymentMethod';
import Header from './Header';


export default {
    title: 'Terminal/Orders/Header',
    component: Header,
    args: {
        topLeft: <OrderID orderId="3c3e" />,
        bottomLeft: (
            <OrderPaymentMethod
                paymentMethod={OrderPaymentMethodTypes.WALLET}
            />
        ),
        topRight: <OrderStatus orderStatus={OrderStatusIdentifier.PLACED} />,
        bottomRight: <OrderType orderType={OrderTypeIdentifier.EAT_IN} />,
    },
} as Meta;

export const Basic: Story = (args) => <Header {...args} />;
