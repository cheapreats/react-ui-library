import React from 'react';
interface ITagDiv extends React.HTMLAttributes<HTMLSpanElement> {
    isHoverable?: boolean;
}
export interface TagProps extends ITagDiv {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    children: React.ReactNode;
}
export declare const Tag: React.FC<TagProps>;
export default Tag;
