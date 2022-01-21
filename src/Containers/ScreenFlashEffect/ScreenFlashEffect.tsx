import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export interface IScreenFlashEffectProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /** a big number for the width, height and z-index of the flash screen, default 99999 */
    veryBigNumber?: number;
    /** default 0.6 */
    flashOpacity?: number;
    /** flash duration in ms, default 1000 */
    flashDuration?: number;
    /** default 4 */
    numberOfFlashes?: number;
    /** the hexadecimal code for color of flash screen, default: ff0000 */
    flashColor?: string;
}

export const ScreenFlashEffect: React.FC<IScreenFlashEffectProps> = ({
    veryBigNumber = 99999,
    flashOpacity = 0.6,
    flashDuration = 1000,
    numberOfFlashes = 4,
    flashColor = 'ff0000',
    ...props
}) => {
    const bodyElement = document.querySelector('body');
    return bodyElement
        ? ReactDOM.createPortal(
            <FlashScreen
                {...props}
                veryBigNumber={veryBigNumber}
                flashOpacity={flashOpacity}
                flashDuration={flashDuration}
                numberOfFlashes={numberOfFlashes}
                flashColor={flashColor}
            />,
            bodyElement,
        )
        : null;
};

const FlashScreen = styled.div<IScreenFlashEffectProps>`
    ${({
        veryBigNumber,
        flashOpacity,
        flashDuration,
        numberOfFlashes,
        flashColor,
    }): string => `
    @keyframes flash {
        from {
            opacity: ${flashOpacity};
        }
        to {
            opacity: 0;
        }
    }

    background-color: #${flashColor};
    opacity:${flashOpacity};
    width: ${veryBigNumber}px;
    height: ${veryBigNumber}px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${veryBigNumber};
    animation-name: flash;
    animation-duration: ${flashDuration}ms;
    animation-iteration-count: ${numberOfFlashes};
    animation-fill-mode: forwards;
    `}
`;
