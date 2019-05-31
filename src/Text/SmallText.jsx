import React from 'react';
import { TextLayout } from '@Layouts';

const SmallText = ({
    children,
    type = 'span',
    size = 'small',
    ...props
}) => {
    return (
        <TextLayout type={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
}

export default SmallText;