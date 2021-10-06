import React from 'react';
import { TextLayout, TextLayoutProps } from '../Fragments/TextLayout';
import { Button } from '../Inputs/Button/Button';
import { SmallText } from './SmallText';

export interface ClickableSmallTextProps extends TextLayoutProps {}

export const ClickableSmallText: React.FC<ClickableSmallTextProps> = ({
    children,
    onClick,
    type = 'span',
    size = 'small',
    color = 'text',
    ...props
}): React.ReactElement => (
    <Button onClick={onClick}>
        <SmallText>{children}</SmallText>
    </Button>
);

export default ClickableSmallText;
