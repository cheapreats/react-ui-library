import { ReactElement, ReactNode } from 'react';
export interface IDropdownItemProps {
    children: ReactNode;
}
declare const DropdownItem: ({ children, ...props }: IDropdownItemProps) => ReactElement;
export default DropdownItem;
