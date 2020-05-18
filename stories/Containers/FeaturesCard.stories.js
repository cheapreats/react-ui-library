import React from 'react';
import { storiesOf } from '@storybook/react';
import { FeaturesCard, SmallText, Paragraph, Footnote } from '../../src';
import { ShoppingBasket } from 'styled-icons/fa-solid';

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

storiesOf('FeaturesCard', module).add('with default', () => (
    <FeaturesCard iconComponent={icon} footerComponent={footer} width={'250px'}>
        <Paragraph bold>Increase Conversion</Paragraph>
        <SmallText>
            Add a fully optimized checkout flow for any device, billing,
            schedule or payment schedule, or payment method
        </SmallText>
    </FeaturesCard>
));
