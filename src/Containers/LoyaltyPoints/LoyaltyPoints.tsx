import React from 'react'; 
import styled from 'styled-components';
import { MainInterface } from '@Utils/BaseStyles';


export interface LoyaltyPointsProps
    extends MainInterface{
            amount: string;
        }

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    amount, ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}><p>{amount}</p></LoyaltyPointsBox>;

const LoyaltyPointsBox = styled.div`

${({theme, ...props}):string => `
border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    width: 50px;
    height: 25px;
    padding: 1px -9px;
    border-radius:30px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    background-color: white;
    text-align: center;
    color: blue;
    
`}

`
//todo: format in accordance with code practices doc discussed in meeting