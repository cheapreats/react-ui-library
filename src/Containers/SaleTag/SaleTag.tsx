import React from 'react';
import styled from 'styled-components';

export interface SaleTagProps extends React.HTMLAttributes<HTMLSpanElement> {
    saleAmount: number;
}

export const SaleTag: React.FC<SaleTagProps> = ({
    saleAmount = 2,
    ...props
}): React.ReactElement => (
    <SaleTagDiv {...props}>
        {fixSaleAmount(saleAmount)}$ off
    </SaleTagDiv>
);

const fixSaleAmount = (amount:number) => {
    amount >= 1 ? amount = Math.floor(amount) : amount = 1;
    return(amount);
}

const SaleTagDiv = styled.span`
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