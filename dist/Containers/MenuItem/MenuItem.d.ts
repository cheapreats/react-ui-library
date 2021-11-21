import React from 'react';
interface IItemChoice {
    name: string;
    price: string;
}
interface IItemModifier {
    choices?: Array<IItemChoice>;
}
export interface IMenuItemProps {
    name: string;
    price: string;
    modifiers?: Array<IItemModifier>;
}
export declare const MenuItem: React.FC<IMenuItemProps>;
export default MenuItem;
