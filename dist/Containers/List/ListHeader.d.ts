import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { SearchBarExpandableProps } from '../../Inputs/SearchBarExpandable/SearchBarExpandable';
import { TextLayoutProps } from '../../__Layouts';
export interface ListHeaderProps extends TextLayoutProps {
    label?: string;
    headerFlex?: string;
    icon?: StyledIcon;
    iconClick?: React.MouseEventHandler;
    iconProps?: string;
    headerRowComponent?: React.ReactElement;
    type?: string;
    padding?: string;
    margin?: string;
    onSearch?: (value: string) => void;
    searchBarWidth?: string;
    searchBarMediaQuery?: string;
    searchBarMediaWidth?: string;
    searchBarProps?: SearchBarExpandableProps;
    onClose?: () => void;
}
export declare const ListHeader: React.FC<ListHeaderProps>;
