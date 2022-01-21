import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface ILeftRightTextProps extends HTMLAttributes<HTMLSpanElement> {
    // text to be rendered on left side of card
    leftText?: string;
    // text to be rendered on right side of card
    rightText?: string;
}

export const LeftRightText: React.FC<ILeftRightTextProps> = ({
    leftText,
    rightText,
    ...props
}: ILeftRightTextProps): React.ReactElement => (
    <LeftText {...props}>
        {leftText}
        <RightText>{rightText}</RightText>
    </LeftText>
);

const RightText = styled.span`
    text-align: right;
    margin-left: auto;
`;

const LeftText = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
`;

export default LeftRightText;
