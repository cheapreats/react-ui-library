import React from 'react'; 
import styled from 'styled-components';
import { Stars } from '@styled-icons/material/Stars';

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    LoyaltyAmount, ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}>
    { 
    LoyaltyAmount >= 100 ?
    <p>+ 99+<Star /></p>:
    <p>+{LoyaltyAmount}<Star /></p>   
    }
</LoyaltyPointsBox>;

export interface LoyaltyPointsProps
    extends React.HTMLAttributes<HTMLSpanElement>{
            LoyaltyAmount: number;
        }

const LoyaltyPointsBox = styled.div`

    ${({theme, ...props}):string => `
        font-family: ${theme.font.family};
        font-size: 20px;
        width: 80px;
        height: 30px;
        white-space: wrap;
        padding: 5px -10px;
        border-radius:0px 50px 50px 0px;
        background-color: ${theme.colors.background};
        text-align: center;
        color: ${theme.colors.loyaltyText};
        
    `}
`
const Star = styled(Stars)`
    width: 20px;
    height: 20px;
`