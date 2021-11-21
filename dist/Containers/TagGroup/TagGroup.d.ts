import React from 'react';
import { TagProps } from '../Tag/Tag';
export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    tags: Array<TagProps>;
}
export declare const TagGroup: React.FC<TagGroupProps>;
