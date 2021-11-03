import React from 'react';
import styled from 'styled-components';

interface ICardTextProps {
    // string to be rendered on right side of card
    leftText: string;
    // string to be rendered on left side of card
    rightText: string;
}

const CardText = ({
    leftText,
    rightText,
    ...props
}: ICardTextProps): React.ReactElement => (
    <LeftText {...props}>
        {leftText}
        <RightText>{rightText}</RightText>
    </LeftText>
);

const RightText = styled.span`
    text-align: right;
    padding-left: 12px;
    margin-left: auto;
`;

const LeftText = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
`;

export default CardText;
