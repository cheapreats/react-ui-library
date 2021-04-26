import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Rnd } from 'react-rnd';

export interface IStretchableButtonProps {
    buttonText: string;
    minWidth: string;
    isDraggable: boolean;
    defaultHeight: string;
    defaultPositionX: number;
    topMargin: string;
}

export const StretchableButton: React.FC<IStretchableButtonProps> = ({
    buttonText,
    minWidth,
    isDraggable,
    defaultHeight,
    defaultPositionX,
    topMargin,
}) => (
    <Container marginTop={topMargin}>
        <Rnd
            disableDragging={!isDraggable}
            minWidth={minWidth}
            bounds="parent"
            enableResizing={{
                right: true,
                left: true,
            }}
            // works at page load
            default={{
                x: defaultPositionX,
                y: 0, // managed by CSS using topMargin props
                width: minWidth,
                height: defaultHeight,
            }}
        >
            <Btn onClick={action('Button is clicked!')}>{buttonText}</Btn>
        </Rnd>
    </Container>
);

interface IMarginProps {
    marginTop: string;
}

const Btn = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.statusColors.red};
    color: ${({ theme }) => theme.colors.background};
    font-weight: bold;
    font-size: 0.95rem;
    font-family: ${({ theme }) => theme.font.family};
`;

const Container = styled.div<IMarginProps>`
    ${({ marginTop }) => `
        transform: translate(0px,${marginTop});
    `}
    position:relative;
`;
