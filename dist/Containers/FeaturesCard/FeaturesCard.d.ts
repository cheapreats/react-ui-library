import React, { ReactNode } from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { CardProps } from '../Card/Card';
export interface FeaturesCardProps extends MainInterface, ResponsiveInterface {
    iconComponent: ReactNode;
    footerComponent: ReactNode;
    width: string;
    cardProps: CardProps;
}
export interface CardWrapperProps {
    width: string;
}
export declare const FeaturesCard: React.FC<FeaturesCardProps>;
export default FeaturesCard;
