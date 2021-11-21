import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { IconProps } from "../Accordion/AccordionItem";
import { HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface IWrapperProps {
    label?: string;
    selectedItem?: string;
    icon?: StyledIcon;
    isSelected?: boolean;
}
export interface INavigationItemProps extends IWrapperProps, MainInterface, ResponsiveInterface, Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    iconProps?: IconProps | {
        style: any;
    };
    headingProps?: HeadingProps;
    onNavigate?: (label?: string, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export declare const NavigationItem: React.FC<INavigationItemProps>;
