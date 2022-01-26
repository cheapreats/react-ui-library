import React from 'react';
import { ShoppingBasket } from '@styled-icons/fa-solid/ShoppingBasket';
import { Meta, Story } from '@storybook/react';
import {
    FeaturesCard,
    SmallText,
    Paragraph,
    FeaturesCardProps,
} from '../../index';


const icon = <ShoppingBasket color="dodgerblue" />;

const children = (
    <div>
        <Paragraph bold>Increase Conversion</Paragraph>
        <SmallText>
            Add a fully optimized checkout flow for any device, billing,
            schedule or payment schedule, or payment method
        </SmallText>
    </div>
);

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

export default {
    title: 'Marketing Website/Features Card',
    component: FeaturesCard,
    args: {
        children,
        iconComponent: icon,
        footerComponent: footer,
        width: '250px',
        cardProps: { animated: false },
    },
} as Meta;

export const Basic: Story<FeaturesCardProps> = (args) => (
    <FeaturesCard {...args} />
);

export const WithCardProps = Basic.bind({});
WithCardProps.args = {
    ...WithCardProps.args,
    cardProps: { animated: true },
};
