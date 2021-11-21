import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from "../../Utils/BaseStyles";
import { CardProps } from '../Card/Card';
export interface SettingsCardProps extends CardProps, MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    heading: string;
    icon: StyledIcon;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    width?: string;
}
export declare const SettingsCard: React.FC<SettingsCardProps>;
