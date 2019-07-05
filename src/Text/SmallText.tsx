import React from 'react';
import { TextLayout, TextLayoutProps } from '@Layouts/TextLayout';

/* export interface SmallTextProps extends TextLayoutProps {

} */

export const SmallText: React.FunctionComponent<TextLayoutProps> = ({
    children,
    type = 'span',
    size = 'small',
    ...props
}): React.ReactElement => (
    <TextLayout type={type} size={size} {...props}>
        { children }
    </TextLayout>
);

export default SmallText;
