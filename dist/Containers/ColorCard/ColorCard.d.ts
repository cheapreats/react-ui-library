import React from 'react';
import { CardProps } from '../Card/Card';
export interface ColorCardProps extends CardProps {
    color: string;
    label: string;
}
export declare const ColorCard: React.FC<ColorCardProps>;
export default ColorCard;
