import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';

interface ImageProps {
    key: number;
    imageLink: string;
    alt: string;
}

export interface SlidingOutPanelProps
    extends MainInterface,
        ResponsiveInterface {
    images: ImageProps[];
}

export const SlidingOutPanels: React.FC<SlidingOutPanelProps> = ({
    images,
}): React.ReactElement => {
    return (
        <Items>
            <Overlay>
                <Image src={images[0].imageLink} alt={images[0].alt} />
                <Image1 src={images[1].imageLink} alt={images[1].alt} />
                <Image2 src={images[2].imageLink} alt={images[2].alt} />
                <Image3 src={images[3].imageLink} alt={images[3].alt} />
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

const Image = styled.img`
    width: 400px;
    height: 180px;
    position: absolute;
    top: 65%;
    left: 50%;
    border-radius: 15px;
    opacity: 1;
    transform: translate(-75%, -75%) scale(0.65) perspective(2038px)
        rotateY(33deg) rotateX(12deg);
    z-index: 1;
    animation: move 2s linear infinite;
    animation-delay: 2s;

    @keyframes move {
        from {
            transform: translate(-75%, -75%) scale(0.65) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
        }
        to {
            transform: translate(-70%, -60%) scale(0.7) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
        }
    }
`;

const Image1 = styled.img`
    width: 400px;
    height: 180px;
    position: absolute;
    top: 60%;
    left: 50%;
    border-radius: 15px;
    opacity: 1;
    transform: translate(-70%, -60%) scale(0.7) perspective(2038px) rotateY(33deg) rotateX(12deg);
    z-index: 2;
    animation: move 2s linear infinite;
    animation-delay: 2s;

    @keyframes move {
        from { transform: translate(-70%, -60%) scale(0.7) perspective(2038px) rotateY(33deg) rotateX(12deg); }
        to { translate(-60%, -55%) scale(0.85) perspective(2038px) rotateY(33deg) rotateX(12deg); }
    }
`;

const Image2 = styled.img`
    width: 400px;
    height: 180px;
    position: absolute;
    top: 55%;
    left: 50%;
    border-radius: 15px;
    opacity: 1;
    transform: translate(-60%, -55%) scale(0.85) perspective(2038px) rotateY(33deg) rotateX(12deg);
    z-index: 3;
    animation: move 2s linear infinite;
    animation-delay: 2s;

    @keyframes move {
        from { translate(-60%, -55%) scale(0.85) perspective(2038px) rotateY(33deg) rotateX(12deg); }
        to { transform: translate(-50%, -50%) scale(1) perspective(2038px)
            rotateY(33deg) rotateX(12deg); }
    }
`;

const Image3 = styled.img`
    width: 400px;
    height: 180px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 15px;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) perspective(2038px) rotateY(33deg)
        rotateX(12deg);
    z-index: 4;
    animation: falling 2s linear infinite;
    animation-delay: 2s;

    @keyframes falling {
        from {
            transform: translate(-50%, -50%) scale(1) perspective(2038px)
                rotateY(33deg) rotateX(12deg);
        }
        to {
            transform: translate(-50%, -1%) scale(1) perspective(2038px)
                rotateY(33deg) rotateX(-90deg);
            opacity: 0;
            top: 90%;
        }
    }
`;
