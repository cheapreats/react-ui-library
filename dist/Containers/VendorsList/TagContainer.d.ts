import React from 'react';
import { TagProps } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface ITagContainerProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    isHoverable?: boolean;
    tagProps?: Omit<TagProps, 'children'>;
    onRemoveTag?: (index: number) => void;
}
export declare const TagContainer: React.FC<ITagContainerProps>;
