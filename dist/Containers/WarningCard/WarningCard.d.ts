import React from 'react';
import { StyledIcon } from 'styled-icons/types';
import { CardProps } from '../Card/Card';
export interface IWarningCardProps extends CardProps {
    action: () => void;
    headerText?: string;
    buttonText?: string;
    buttonMargin?: string;
    icon?: StyledIcon;
    iconSize?: string;
    buttonIcon?: StyledIcon;
    flexDirection?: string;
}
export declare const WarningCard: React.FC<IWarningCardProps>;
