import React from 'react';
import styled from 'styled-components';
import { MainInterface } from '@Utils/BaseStyles';

export interface SaleTagProps extends MainInterface {
    saleAmount: number;
}

export const SaleTag: React.FC<SaleTagProps> = ({
    saleAmount = 2,
    ...props
}): React.ReactElement => (
    <SaleTagDiv {...props} saleAmount={saleAmount}>
        {saleAmount}$ off
    </SaleTagDiv>
);

const SaleTagDiv = styled.span<SaleTagProps>`
    ${({theme, ...props}):string => `
        border-radius: 100px;
        width: 100px;
        height: 40px;
        padding: 3px 10px;
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