import React from 'react';
import Lottie from 'react-lottie';
import { animationData } from './file_moving';

interface IFileMovingAnimation {}

export const FileMovingAnimation: React.FC<IFileMovingAnimation> =
    (): React.ReactElement => {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };
        return <Lottie options={defaultOptions} width={140} height={80} />;
    };
