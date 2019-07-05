import React from 'react';
import { TextLayout, TextLayoutProps } from '@Layouts/TextLayout';

/* export interface ParagraphProps extends TextLayoutProps {

} */

export const Paragraph: React.FunctionComponent<TextLayoutProps> = ({
    children,
    ...props
}): React.ReactElement => (
    <TextLayout {...props}>
        { children }
    </TextLayout>
);
