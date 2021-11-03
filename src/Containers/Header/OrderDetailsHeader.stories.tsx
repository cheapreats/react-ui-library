import React from 'react';
import { Meta, Story } from '@storybook/react';
import OrderStatus from '@Containers/OrderStatus/OrderStatus';
import OrderType from '@Text/OrderType/OrderType';
import OrderPaymentMethod from '@Text/OrderPaymentMethod/OrderPaymentMethod';
import { Paragraph } from '@Text/Paragraph';
import Header from './Header';
import { createStoryTitle } from '../../Constants';

const topLeftElement = (
    <Paragraph size="1.4rem" bold>
        Order #2a3e
    </Paragraph>
);
const bottomLeftElement = <OrderPaymentMethod paymentMethod="WALLET" />;
const topRightElement = <OrderStatus orderStatus="PLACED" />;
const bottomRightElement = <OrderType orderType="EAT_IN" />;

export default {
    title: createStoryTitle('Order Header'),
    component: Header,
    args: {
        topLeft: topLeftElement,
        bottomLeft: bottomLeftElement,
        topRight: topRightElement,
        bottomRight: bottomRightElement,
    },
} as Meta;

export const Basic: Story = (args) => <Header {...args} />;
