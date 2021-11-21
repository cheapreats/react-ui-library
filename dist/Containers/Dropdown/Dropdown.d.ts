import React from 'react';
import DropdownItem from './DropdownItem';
declare type DropdownComponent<P = {}> = React.NamedExoticComponent<P> & {
    Item: typeof DropdownItem;
};
export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    dropdownButton: React.ReactElement;
    dropdownWidth?: number;
    right?: boolean;
}
declare const _default: DropdownComponent<{}>;
export default _default;
