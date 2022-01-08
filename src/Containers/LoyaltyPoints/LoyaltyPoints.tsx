import React from 'react';
import styled from 'styled-components';
import { Stars } from '@styled-icons/material/Stars';

export interface LoyaltyPointsProps
    extends React.HTMLAttributes<HTMLDivElement> {
    loyaltyamount: number; //the amount of loyalty points that the user gets with purchase, used to display on component.
    loyaltypointlimit: number; //the limit of loyalty points before it says 99+ instead.
}

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    loyaltyamount,
    loyaltypointlimit,
    ...props
}): React.ReactElement => <LoyaltyPointsBox {...props}>
    <header>+{getLoyaltyPoints(loyaltyamount, loyaltypointlimit)}<Star /></header>
    </LoyaltyPointsBox>;

function getLoyaltyPoints(loyaltypoints: number, loyaltypointlimit: number) {
    if (loyaltypoints >= loyaltypointlimit) {
        return loyaltypointlimit + "⁺";
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