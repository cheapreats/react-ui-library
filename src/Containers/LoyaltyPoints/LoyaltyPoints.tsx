import React from 'react'; 
import styled from 'styled-components';
import { Stars } from '@styled-icons/material/Stars';
import {Paragraph} from '@Text';

export interface LoyaltyPointsProps
    extends React.HTMLAttributes<HTMLDivElement>{
            loyaltyamount: number; //the amount of loyalty points that the user gets with purchase, used to display on component.
            loyaltypointlimit: number; //the limit of loyalty points before it says 99+ instead.
        }

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    loyaltyamount,
    loyaltypointlimit, 
    ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}>{ 
    <Paragraph>+{getLoyaltyPoints(loyaltyamount,loyaltypointlimit)}<Star /></Paragraph>   
    }
</LoyaltyPointsBox>;

function getLoyaltyPoints(loyaltypoints: number,loyaltypointlimit: number){
    if(loyaltypoints >= loyaltypointlimit){
    return "99⁺";}
    return Math.round(loyaltypoints)
}

const LoyaltyPointsBox = styled(Paragraph)`
    &{
    ${({theme, ...props}):string => `
        font-family: ${theme.font.family};
        font-size: 20px;
        width: 60px;
        height: 30px;
        white-space: wrap;
        padding: 5px -10px;
        border-radius:0px 50px 50px 0px;
        background-color: ${theme.colors.background};
        color: ${theme.colors.loyaltyText};
        vertical-allign: middle;
    `}
    }
`
const Star = styled(Stars)`
    width: 20px;
    height: 20px;
`