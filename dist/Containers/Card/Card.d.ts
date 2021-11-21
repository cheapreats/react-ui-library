import React from 'react';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
export interface CardProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
}
export declare const Card: React.FC<CardProps>;
export default Card;
