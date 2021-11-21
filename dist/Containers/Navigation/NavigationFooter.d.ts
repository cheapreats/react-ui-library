import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../../Utils/Hooks';
export interface NavigationFooterProps extends MainInterface, ResponsiveInterface, ImplicitPropsInterface, React.HTMLAttributes<HTMLDivElement> {
    url: string;
    text: string;
    icon: StyledIcon;
}
export declare const NavigationFooter: React.FC<NavigationFooterProps>;
