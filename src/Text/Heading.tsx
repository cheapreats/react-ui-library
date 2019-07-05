import React from 'react';
import { TextLayout, TextLayoutProps } from '@Layouts/TextLayout';

/* export interface HeadingProps extends TextLayoutProps {

} */

export const Heading: React.FunctionComponent<TextLayoutProps> = ({
    children,
    type = 'h1',
    size = type,
    ...props
}): React.ReactElement => (
    <TextLayout type={type} size={size} {...props}>
        { children }
    </TextLayout>
);

export default Heading;
