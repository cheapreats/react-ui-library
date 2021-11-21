import React from 'react';
export interface IStretchableButtonProps {
    buttonText: string;
    minWidth: string;
    isDraggable: boolean;
    defaultHeight: string;
    defaultPositionX: number;
    topMargin: string;
}
export declare const StretchableButton: React.FC<IStretchableButtonProps>;
