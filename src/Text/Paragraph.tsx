import React from "react";
import TextLayout, { TextLayoutProps } from '@Layouts/TextLayout';

export interface ParagraphProps extends TextLayoutProps {
};

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
    return (
        <TextLayout { ...props }>
            { children }
        </TextLayout>
    );
};

export default Paragraph;
