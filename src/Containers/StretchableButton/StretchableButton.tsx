import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Rnd } from "react-rnd";

export interface IStretchableButtonProps {
    buttonText: string;
    minWidth: string;
    isDraggable: boolean;
    defaultHeight: string;
    defaultPositionX: number;
    defaultPositionY: number;
}

export const StretchableButton: React.FC<IStretchableButtonProps> = ({
    buttonText,
    minWidth,
    isDraggable,
    defaultHeight,
    defaultPositionX,
    defaultPositionY
}) => {
    return (
            <Rnd disableDragging={!isDraggable} minWidth={minWidth} bounds="parent" 
                enableResizing={{
                    right: true,
                    left: true
                }}
                default={{
                    x: defaultPositionX,
                    y: defaultPositionY,
                    width: minWidth,
                    height: defaultHeight
                  }}
                >
                <Btn onClick={action('Button is clicked!')}>
                    {buttonText}
                </Btn>
            </Rnd>
    );
};
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