import React from 'react';
export interface SaleTagProps extends React.HTMLAttributes<HTMLDivElement> {
    saleAmount: number;
}
export declare const SaleTag: React.FC<SaleTagProps>;
