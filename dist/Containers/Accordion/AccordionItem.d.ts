import React from 'react';
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    header: string;
    activeStyle: Function;
}
export interface SectionDivProps {
    isActive: boolean;
    height: number;
}
export interface HeaderDivProps {
    isActive: boolean;
}
export interface HeaderProps {
    isActive: boolean;
    activeStyle: Function;
}
export interface IconProps {
    isActive: boolean;
}
export declare const AccordionItem: React.FC<AccordionItemProps>;
