import React from "react";
import { TextLayout, TextLayoutProps } from '@Layouts';

export interface HeadingProps extends TextLayoutProps {

};

export const Heading = ({
    children,
    type = 'h1',
    size = type,
    ...props
}: TextLayoutProps) => {
    return (
        <TextLayout type={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
};

export default Heading;
