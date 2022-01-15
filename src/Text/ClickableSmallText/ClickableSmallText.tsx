import React from 'react';
import { TextLayout, TextLayoutProps } from '../../Fragments/TextLayout';

export interface ClickableSmallTextProps extends TextLayoutProps {}

export const ClickableSmallText: React.FC<ClickableSmallTextProps> = ({
    children,
    type = 'span',
    size = 'small',
    color = 'text',
    onClick,
    ...props
}): React.ReactElement => (
    <TextLayout
        type={type}
        size={size}
        color={color}
        onClick={onClick}
        {...props}
    >
        {children}
    </TextLayout>
);

export default ClickableSmallText;
