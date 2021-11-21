import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
interface _NavigationItemProps {
    icon?: StyledIcon;
    to?: string;
    exact?: boolean;
    type?: any | string | number | symbol;
}
export declare const NavigationItem: React.FC<_NavigationItemProps>;
export {};
