import { Card } from "@Containers/Card/Card";
import { Elements } from "@stripe/react-stripe-js";
import { Heading } from "@Text/Heading/Heading";
import { ISnowyBackgroundProps, SnowyBackgroundTemplate } from './SnowyBackgroundTemplate';
import { Meta, Story } from '@storybook/react';
import { Microphone, ShoppingCart } from 'styled-icons/fa-solid';
import React from 'react';
import { SmallText } from "@Text/SmallText";
import styled from 'styled-components';

const LOGO =
  "https://www.cheapreats.com/static/90939a6dc8dacea8e44d046c72521a1b/16c7d/logo.png";

const Header = styled.div`
  font-size: 20px;
`;

const StyledCard = styled(Card)`
  width: 60%;
  text-align: center;
  margin-top: 10em;
  margin-left: auto;
  margin-right: auto;
  postion: relative;
  padding: 3em;
`;

const StyledHeading = styled(Heading)`
    color: green;
    text-align: center;
    font-weight: bold;
`;

const StyledSmallText = styled(SmallText)`
    text-align: center;
`;

export default {
    title: 'Voice User Interface/SnowyBackground/SnowyBackground Template',
    component: SnowyBackgroundTemplate,
    args: {
        backgroundColor: '#ff6666',
        snowColor: 'white',
    },
    success_args: {
        backgroundColor: '#ff6666',
        snowColor: 'white',
        children: (
            <StyledCard animated>
                <img src={LOGO} />
                <StyledHeading>Thanks for your order!</StyledHeading>
                <StyledSmallText size='large'> 
                    We appreciate your business! If you have any questions, please email
                    <a href="mailto:hello@cheapreats.com"> hello@cheapreats.com </a>
                </StyledSmallText>
            </StyledCard>
        )
    },
}

export const Basic: Story<ISnowyBackgroundProps> = (args) => (
    <SnowyBackgroundTemplate {...args} />
);

export const Success: Story<ISnowyBackgroundProps> = (success_args) => (
    <SnowyBackgroundTemplate {...success_args} />
);