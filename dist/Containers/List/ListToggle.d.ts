import React from 'react';
interface ListToggleProps extends ButtonProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isToggleHiddenDesktop?: boolean;
}
export declare const ListToggle: React.FC<ListToggleProps>;
interface ButtonProps {
    isLeftToggle?: boolean;
    isToggleHiddenDesktop?: boolean;
}
export {};
