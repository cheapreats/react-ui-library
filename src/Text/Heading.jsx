import React from 'react';
import { TextLayout } from '@Layouts';

const Heading = ({
    children,
    type = 'h1',
    size = type,
    ...props
}) => {
    return (
        <TextLayout as={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
}

export default Heading;