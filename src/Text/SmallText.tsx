import React from "react";
import TextLayout, { TextLayoutProps } from '@Layouts/TextLayout';

export interface SmallTextProps extends TextLayoutProps {

};

export const SmallText: React.FunctionComponent<SmallTextProps> = ({
    children,
    type = 'span',
    size = 'small',
    ...props
}): React.ReactElement => {
    return (
        <TextLayout type={ type } size={ size } { ...props }>
            { children }
        </TextLayout>
    );
};

export default SmallText;
