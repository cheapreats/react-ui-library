import React from 'react';
export interface ICardDataProps {
    id: string;
    icon: string;
    title: string;
    time: string;
}
export interface ITransactionProps {
    cardData: [ICardDataProps];
    animationDelay: number;
    animationTime: number;
}
export declare const TransactionList: React.FC<ITransactionProps>;
