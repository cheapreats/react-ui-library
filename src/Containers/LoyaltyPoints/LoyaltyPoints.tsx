import React from 'react'; 
import styled from 'styled-components';
import { MainInterface } from '@Utils/BaseStyles'

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    amount, ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}><p>{amount}</p></LoyaltyPointsBox>;

export interface LoyaltyPointsProps
    extends MainInterface{
            amount: string;
        }

const LoyaltyPointsBox = styled.div`

    ${({theme}):string => `
        font-family: ${theme.font.family};
        font-size: 20px;
        width: 60px;
        height: 30px;
        padding: 5px -10px;
        border-radius:50px;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
        background-color: ${theme.colors.background};
        text-align: center;
        color: ${theme.colors.loyaltyText};
        
    `}

`