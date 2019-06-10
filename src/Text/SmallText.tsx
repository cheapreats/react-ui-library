import * as React from "react";
import { TextLayout } from '../Layouts';

export interface SmallTextProps {
    children: React.ReactNode,
    type?: string,
    size?: string
}

const SmallText = ({
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
