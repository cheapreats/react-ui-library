import React from 'react'; 
import styled from 'styled-components';
import { MainInterface } from '@Utils/BaseStyles';
import { Stars } from '@styled-icons/material/Stars';

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    LoyaltyAmount, ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}><p>+{LoyaltyAmount}<Star /></p></LoyaltyPointsBox>;

const Star = styled(Stars)`
    width: 20px;
    height: 20px;
`
export interface LoyaltyPointsProps
    extends MainInterface{
            LoyaltyAmount: number;
        }

const LoyaltyPointsBox = styled.div`

    ${({theme, ...props}):string => `
        font-family: ${theme.font.family};
        font-size: 20px;
        width: 60px;
        height: 30px;
        white-space: wrap;
        padding: 5px -10px;
        border-radius:50px;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
        background-color: ${theme.colors.background};
        text-align: center;
        color: ${theme.colors.loyaltyText};
        
    `}

`