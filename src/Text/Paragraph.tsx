import * as React from "react";
import { TextLayout } from '../Layouts';

export interface ParagraphProps {
    children: React.ReactNode,
}

const Paragraph = ({ children, ...props }: ParagraphProps) => {
    return (
        <TextLayout { ...props }>
            { children }
        </TextLayout>
    );
};

export default Paragraph;
