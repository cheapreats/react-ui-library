import React from 'react';
export interface ScrollableListContentProps extends React.HTMLAttributes<HTMLDivElement> {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    withList?: boolean;
}
export declare const ScrollableListContent: React.FC<ScrollableListContentProps>;
