import React from 'react';
interface IModalProps {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export interface IData {
    name: string;
    redemptionPoints: number;
}
export interface IItemsRedemptionPointsProps {
    modalProps: IModalProps;
    titleText: string;
    titleDescription: string;
    cancelButtonText: string;
    applyButtonText: string;
    batchUpdateButtonText: string;
    onClickCancelButton: () => void;
    onClickApplyButton: (dataItems: IData[]) => void;
    data: IData[];
    applyToAllItemsText: string;
}
export declare const ItemsRedemptionPoints: React.FC<IItemsRedemptionPointsProps>;
export {};
