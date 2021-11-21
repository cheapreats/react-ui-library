import React from 'react';
interface ListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    padding?: string;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isSelected?: boolean;
}
export declare const ListItem: React.FC<ListItemProps>;
export {};
