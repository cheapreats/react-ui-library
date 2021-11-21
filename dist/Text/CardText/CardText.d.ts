import React, { HTMLAttributes } from 'react';
interface ILeftRightTextProps extends HTMLAttributes<HTMLSpanElement> {
    leftText?: string;
    rightText?: string;
}
declare const LeftRightText: ({ leftText, rightText, ...props }: ILeftRightTextProps) => React.ReactElement;
export default LeftRightText;
