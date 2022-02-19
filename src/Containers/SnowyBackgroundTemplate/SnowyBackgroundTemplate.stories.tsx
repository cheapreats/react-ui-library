import { Card } from "@Containers/Card/Card";
import { Heading } from "@Text/Heading/Heading";
import { ISnowyBackgroundProps, SnowyBackgroundTemplate } from './SnowyBackgroundTemplate';
import { Meta, Story } from '@storybook/react';
import { Microphone, ShoppingCart } from 'styled-icons/fa-solid';
import React from 'react';
import { SmallText } from "@Text/SmallText";
import styled from 'styled-components';
import { OrderSummary } from "@Containers/OrderSummary/OrderSummary";
import Header from "@Containers/Header/Header";
import { Elements } from "@stripe/react-stripe-js";
import { CardCheckoutForm } from "@Inputs/CardCheckoutForm/CardCheckoutForm";

const cartProps = {
    _id: '',
    items: [],
    subtotal: 0,
}

const LOGO =
  "https://www.cheapreats.com/static/90939a6dc8dacea8e44d046c72521a1b/16c7d/logo.png";

const headingProps = {
    color: 'green',
    bold: true, 
    textAlign: 'center',
}

const smallTextProps = {
    size: 'large',
    textAlign: 'center',
}

export default {
    title: 'Voice User Interface/SnowyBackground/SnowyBackground Template',
    component: SnowyBackgroundTemplate,
    args: {
        backgroundColor: '#ff6666',
        snowColor: 'white',
    },
}

export const Empty: Story<ISnowyBackgroundProps> = () => (
    <SnowyBackgroundTemplate />
);

export const Checkout: Story<ISnowyBackgroundProps> = (args) => (
    <SnowyBackgroundTemplate {...args} >
        <Card>
            <OrderSummary cart={cartProps} />
            <Header>Payment</Header>
            <Elements stripe={null}>
                <CardCheckoutForm />
            </Elements>
        </Card>
    </SnowyBackgroundTemplate>
);

export const Success: Story<ISnowyBackgroundProps> = (args) => (
    <SnowyBackgroundTemplate {...args} >
        <Card>
            <img src={LOGO} />
            <Heading {...headingProps}> Thanks for your order! </Heading>
            <SmallText {...smallTextProps} > 
                We appreciate your business! If you have any questions, please email
                <a href="mailto:hello@cheapreats.com"> hello@cheapreats.com </a>
            </SmallText>
        </Card>
    </SnowyBackgroundTemplate>
);