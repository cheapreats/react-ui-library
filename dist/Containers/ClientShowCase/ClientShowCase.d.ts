import React from 'react';
declare enum IMAGE_HEIGHTS {
    small = 15,
    medium = 30,
    large = 45,
    extraLarge = 60
}
export interface ShowCaseProps extends React.HTMLAttributes<HTMLDivElement> {
    imgData: string[];
    handleImageListClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onHoverComponent?: React.ReactNode;
    imgHeightEnum?: IMAGE_HEIGHTS;
    blurOnHover?: boolean;
}
export declare const ClientShowCase: React.FC<ShowCaseProps>;
export {};
