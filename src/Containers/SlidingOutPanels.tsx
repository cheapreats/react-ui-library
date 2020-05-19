import React from 'react';
import styled, { css } from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';

interface ImageProps {
    id: string;
    imageSource: string;
    alt: string;
    imagePanelClick?(imageLink: string): Function;
}

export interface SlidingOutPanelProps
    extends MainInterface,
        ResponsiveInterface {
    images: ImageProps[];
}

export const SlidingOutPanels: React.FC<SlidingOutPanelProps> = ({
    images,
}): React.ReactElement => {
    const imagePanelClick = (imageLink: string): void => { window.location.replace(imageLink) }
    return (
        <Items>
            <Overlay>
                {images.map(
                    ({ id, imageSource, alt }): React.ReactElement => (
                        <Image key={id} id={id} src={imageSource} alt={alt} onClick={(): void => imagePanelClick(imageSource)} />
                    ),
                )}
            </Overlay>
        </Items>
    );
};

const Items = styled.div`
    width: 500px;
    height: 350px;
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
`;

const Overlay = styled.div`
    width: 450px;
    height: 200px;
    position: relative;
    border-radius: 15px;
`;

interface StyledImageProps {
    id: string;
}

const Image = styled.img<StyledImageProps>`
    width: 400px;
    height: 180px;
    position: absolute;
    border-radius: 15px;
    opacity: 1;
    cursor: pointer;

    ${({ id }): {} =>
        id === '1' &&
        css`
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
            z-index: 4;
            animation: falling 2s linear infinite;
            animation-delay: 2s;

            @keyframes falling {
                from {
                    transform: translate(-50%, -50%) scale(1)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
                to {
                    transform: translate(-50%, -1%) scale(1) perspective(2038px)
                        rotateY(33deg) rotateX(-90deg);
                    opacity: 0;
                    top: 90%;
                }
            }
        `}

    ${({ id }): {} =>
        id === '2' &&
        css`
            top: 55%;
            left: 50%;
            transform: translate(-60%, -55%) scale(0.85) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
            z-index: 3;
            animation: move1 2s linear infinite;
            animation-delay: 2s;

            @keyframes move1 {
                from {
                    transform: translate(-60%, -55%) scale(0.85)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
                to {
                    transform: translate(-50%, -50%) scale(1)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
            }
        `}

    ${({ id }): {} =>
        id === '3' &&
        css`
            top: 60%;
            left: 50%;
            transform: translate(-70%, -60%) scale(0.7) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
            z-index: 2;
            animation: move2 2s linear infinite;
            animation-delay: 2s;

            @keyframes move2 {
                from {
                    transform: translate(-70%, -60%) scale(0.7)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
                to {
                    transform: translate(-60%, -55%) scale(0.85)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
            }
        `}

    ${({ id }): {} =>
        id >= '4' &&
        css`
            top: 65%;
            left: 50%;
            transform: translate(-75%, -75%) scale(0.65) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
            z-index: 1;
            animation: move3 2s linear infinite;
            animation-delay: 2s;

            @keyframes move3 {
                from {
                    transform: translate(-75%, -75%) scale(0.65)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
                to {
                    transform: translate(-70%, -60%) scale(0.7)
                        perspective(2038px) rotateY(33deg) rotateX(12deg);
                }
            }
        `}
`;
