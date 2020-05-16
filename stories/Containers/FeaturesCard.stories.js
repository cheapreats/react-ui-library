import React from 'react';
import { storiesOf } from '@storybook/react';
import { FeaturesCard, SmallText, Paragraph } from '../../src';
import { ShoppingBasket } from 'styled-icons/fa-solid';

storiesOf('FeaturesCard', module)
    .add('with icon', () => (
        <FeaturesCard icon={ShoppingBasket} width={250}>
            <Paragraph bold>Increase Conversion</Paragraph>
            <SmallText>
                Add a fully optimized checkout flow for any device, billing,
                schedule or payment schedule, or payment method
            </SmallText>
        </FeaturesCard>
    ))
    .add('with icon color', () => (
        <FeaturesCard icon={ShoppingBasket} iconColor="dodgerblue" width={250}>
            <Paragraph bold>Increase Conversion</Paragraph>
            <SmallText>
                Add a fully optimized checkout flow for any device, billing,
                schedule or payment schedule, or payment method
            </SmallText>
        </FeaturesCard>
    ));
