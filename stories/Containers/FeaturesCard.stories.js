import React from 'react';
import { storiesOf } from '@storybook/react';
import { FeaturesCard, SmallText, Paragraph } from '../../src';
import { ShoppingBasket } from '@styled-icons/fa-solid/ShoppingBasket';
import {createStoryTitle} from "../Constants";

const icon = <ShoppingBasket color="dodgerblue" />;
const footer = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            height: '30px',
            backgroundColor: 'rgba(0,100,255,8%)',
        }}
    >
        <SmallText>Footer</SmallText>
    </div>
);

storiesOf(createStoryTitle('Features Card'), module)
    .add('with default', () => (
        <FeaturesCard
            iconComponent={icon}
            footerComponent={footer}
            width={'250px'}
        >
            <Paragraph bold>Increase Conversion</Paragraph>
            <SmallText>
                Add a fully optimized checkout flow for any device, billing,
                schedule or payment schedule, or payment method
            </SmallText>
        </FeaturesCard>
    ))
    .add('with cardProps', () => (
        <FeaturesCard
            iconComponent={icon}
            footerComponent={footer}
            width={'250px'}
            cardProps={{ animated: true }}
        >
            <Paragraph bold>Increase Conversion</Paragraph>
            <SmallText>
                Add a fully optimized checkout flow for any device, billing,
                schedule or payment schedule, or payment method
            </SmallText>
        </FeaturesCard>
    ));
