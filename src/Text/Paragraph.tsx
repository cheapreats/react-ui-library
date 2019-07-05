import React from "react";
import TextLayout, { TextLayoutProps } from '@Layouts/TextLayout';

export interface ParagraphProps extends TextLayoutProps {
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
    children,
    ...props
}): React.ReactElement => {
    return (
        <TextLayout { ...props }>
            { children }
        </TextLayout>
    );
};

export default Paragraph;
