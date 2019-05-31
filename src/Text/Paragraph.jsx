import React from 'react';
import { TextLayout } from '@Layouts';

const Paragraph = ({ children, ...props }) => {
    return (
        <TextLayout { ...props }>
            { children }
        </TextLayout>
    );
}

export default Paragraph;