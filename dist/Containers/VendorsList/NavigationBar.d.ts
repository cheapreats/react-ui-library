import React from 'react';
import { INavigationItemProps } from './NavigationItem';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface INavigationBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    navigationBarItems: INavigationItemProps[];
    navigationItemProps?: INavigationItemProps;
    selectedNavLabel?: string;
}
export declare const NavigationBar: React.FC<INavigationBarProps>;
