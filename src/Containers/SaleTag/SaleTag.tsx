import React from 'react';
import styled from 'styled-components';
import { positiveRounding } from '@Utils/positiveRounding';

export interface SaleTagProps extends React.HTMLAttributes<HTMLDivElement> {
    /*Amount to be displayed on SaleTag, the difference between a price and discounted price*/
    saleAmount: number;
}

export const SaleTag: React.FC<SaleTagProps> = ({
    saleAmount = 2,
    ...props
}): React.ReactElement => (
    <SaleTagDiv {...props}>
        {positiveRounding(saleAmount)}$ off
    </SaleTagDiv>
);

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