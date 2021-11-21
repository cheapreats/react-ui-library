import React from 'react';
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    toggleComponent?: React.ReactElement;
    id: string;
    columnWidth?: string;
    backgroundColor?: string;
    margin?: string;
    right?: string;
    left?: string;
    onCloseTranslateXAxis?: string;
    cssPosition?: string;
    isOpen?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    zIndex?: number;
    mediaMixin?: string;
    mediaMargin?: string;
    mediaRight?: string;
    mediaLeft?: string;
    mediaCssPosition?: string;
    mediaOnCloseTranslateXAxis?: string;
}
export declare const List: React.FC<ListProps>;
