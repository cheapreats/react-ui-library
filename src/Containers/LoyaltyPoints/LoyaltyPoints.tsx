import React from 'react';
import styled from 'styled-components';
import { Stars } from '@styled-icons/material/Stars';

export interface LoyaltyPointsProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* The amount of loyalty points displayed on the component */
    loyaltyAmount: number;
    /* Limit before loyalty amount displays only this number instead */
    loyaltyPointLimit: number; 
}

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    loyaltyAmount,
    loyaltyPointLimit,
    ...props
}): React.ReactElement => <LoyaltyPointsBox {...props}>
    <header>+{getLoyaltyPoints(loyaltyAmount, loyaltyPointLimit)}<Star /></header>
    </LoyaltyPointsBox>;

function getLoyaltyPoints(loyaltypoints: number, loyaltyPointLimit: number) {
    if (loyaltypoints >= loyaltyPointLimit) {
        return loyaltyPointLimit + "⁺";
    }
    return Math.round(loyaltypoints);
}

const LoyaltyPointsBox = styled.div`
    ${({ theme }): string => `
        font-family: ${theme.font.family};
        font-size: 20px;
        width: fit-content;
        min-width: 60px;
        height: 30px;
        border-radius:0px 50px 50px 0px;
        background-color: ${theme.colors.background};
        color: ${theme.colors.loyaltyText};
        text-align: center;
    `}
`
const Star = styled(Stars)`
    width: 20px;
    height: 20px;
`