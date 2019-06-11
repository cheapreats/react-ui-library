import React from "react";
import TextLayout, { TextLayoutProps } from '@Layouts/TextLayout';

export interface SmallTextProps extends TextLayoutProps {

};

export const SmallText = ({
    children,
    type = 'span',
    size = 'small',
    ...props
}: SmallTextProps) => {
    return (
        <TextLayout type={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
};

export default SmallText;
