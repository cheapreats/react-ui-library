import React from 'react';
interface IAdditionalProps {
    isMaxWidthOfRootContainer?: boolean;
}
export declare enum EntryType {
    Heading = 0,
    Entry = 1
}
interface IEntries {
    type: EntryType;
    data: IEntryProps | (IHeadingEntryProps & IAdditionalProps);
}
export interface INutritionFactProps {
    entries: IEntries[];
    isEditMode?: boolean;
}
export declare const NutritionFact: React.FC<INutritionFactProps>;
interface ICommonEntryProps {
    fontSize?: string;
    isBold?: boolean;
    separatorWidth?: number;
    isEditMode?: boolean;
    margin?: string;
    padding?: string;
}
interface IHeadingEntryProps extends ICommonEntryProps {
    leftText: string;
    justifyContent?: string;
    rightText?: string;
    isEditable?: boolean;
}
interface IEntryProps extends ICommonEntryProps {
    amount?: number;
    dailyAmount: number;
    label: string;
    unity: string;
    indentationNumber?: number;
    indentationSize?: number;
}
export {};
