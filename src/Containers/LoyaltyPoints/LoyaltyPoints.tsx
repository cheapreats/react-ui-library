import React from 'react'; 
import styled from 'styled-components';
import {
    Main,
    MainInterface,
} from '@Utils/BaseStyles';

export interface LoyaltyPointsProps
    extends MainInterface{
            amount: '+10★';
        }

export const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
    ...props
}):React.ReactElement => <LoyaltyPointsBox {...props}></LoyaltyPointsBox>;

const LoyaltyPointsBox = styled.div<LoyaltyPointsProps & MainInterface>`

${({theme, ...props}):string => `
border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    width: 40px;
    height: 25px;
    padding: 1px 3px;
    border-radius:30px;
    background-color: white;
    color: blue;
    
`}

`
//todo: test in storybook