import * as React from "react";
import { TextLayout } from '@Layouts';

export interface HeadingProps {
    children: React.ReactNode,
    type?: string,
    size?: string
}

const Heading = ({
    children,
    type = 'h1',
    size = type,
    ...props
}: HeadingProps) => {
    return (
        <TextLayout type={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
};

export default Heading;
