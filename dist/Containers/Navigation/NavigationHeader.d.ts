import React from 'react';
import { HeadingProps } from '../../Text';
interface _NavigationHeaderProps extends HeadingProps {
    label?: string;
    logo?: string;
}
export interface NavigationHeaderProps {
    label?: string;
    logo?: string;
}
export declare const NavigationHeader: React.FC<_NavigationHeaderProps>;
export {};
