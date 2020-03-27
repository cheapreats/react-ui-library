import React from 'react';
import { TextLayout, TextLayoutProps } from '@Layouts/TextLayout';

export interface HeadingProps extends TextLayoutProps {}

enum elements {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6',
}

export const Heading: React.FC<HeadingProps> = ({
    children,
    type = 'h1',
    size = elements[type] || elements.h1,
    ...props
}): React.ReactElement => (
    <TextLayout type={type} size={size} {...props}>
        {children}
    </TextLayout>
);

export default Heading;
