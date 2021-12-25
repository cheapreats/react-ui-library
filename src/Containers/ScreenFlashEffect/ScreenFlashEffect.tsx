import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export interface IScreenFlashEffectProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** a big number for the width, height and z-index of the flash screen */
    veryBigNumber?: number;
    opacity?: number;
    animationDurationInMs?: number;
    numberOfFlashes?: number;
    /** the hexadecimal code for color of flash screen, default: ff0000 */
    color?: string;
}

export const ScreenFlashEffect: React.FC<IScreenFlashEffectProps> = ({
    veryBigNumber = 99999,
    opacity = 0.6,
    animationDurationInMs = 1000,
    numberOfFlashes = 4,
    color = 'ff0000',
    ...props
}) => {
    const bodyElement = document.querySelector('body');
    return bodyElement
        ? ReactDOM.createPortal(
            <FlashScreen
                {...props}
                veryBigNumber={veryBigNumber}
                opacity={opacity}
                animationDurationInMs={animationDurationInMs}
                numberOfFlashes={numberOfFlashes}
                color={color}
            />,
            bodyElement,
        )
        : null;
};

const FlashScreen = styled.div<IScreenFlashEffectProps>`
    ${({
        veryBigNumber,
        opacity,
        animationDurationInMs,
        numberOfFlashes,
        color,
    }): string => `
    @keyframes flash {
        from {
            opacity: ${opacity};
        }
        to {
            opacity: 0;
        }
    }

    background-color: #${color};
    opacity:${opacity};
    width: ${veryBigNumber}px;
    height: ${veryBigNumber}px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${veryBigNumber};
    animation-name: flash;
    animation-duration: ${animationDurationInMs}ms;
    animation-iteration-count: ${numberOfFlashes};
    animation-fill-mode: forwards;
    `}
`;
