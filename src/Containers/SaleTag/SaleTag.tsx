import React from 'react';
import styled from 'styled-components';
import { MainInterface } from '@Utils/BaseStyles';

export const SaleTag: React.FC<SaleTagProps> = ({
    amount = 2,
    ...props
}): React.ReactElement => (
    <SaleTagDiv {...props} amount={amount}>
        {amount}$ off
    </SaleTagDiv>
);

export interface SaleTagProps extends MainInterface {
    amount: number;
}

const SaleTagDiv = styled.span<SaleTagProps>`
    ${({theme, ...props}):string => `
        border-radius: 100px;
        width: 100px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
        border-style: solid;
        border-width: 1px;
        font-size: 15px;
        
        background-color: ${theme.colors.background};
        color: ${theme.colors.primary};
        border-color: ${theme.colors.border};
        font-family: ${theme.font.family};
        font-weight: bolder;
        text-align: center;
    `}
`;