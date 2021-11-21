import React from 'react';
import { CardProps } from '../Card/Card';
export interface ILandingProps extends CardProps {
    children: React.ReactNode;
    label?: string;
    description?: string;
    loading?: boolean;
    version: string | number;
    logo?: string;
}
export declare const Landing: React.FC<ILandingProps>;
