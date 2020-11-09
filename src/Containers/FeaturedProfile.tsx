import React from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';
import { flex } from '../Utils/Mixins';

export interface IFeaturedProfileProps {
    background: string;
    key: number;
    image?: string;
    initials?: string;
    remainingProfiles?: number;
    icon?: boolean;
    width?: number;
    height?: number;
    alt?: string;
}

export const FeaturedProfile: React.FC<IFeaturedProfileProps> = ({
    alt = 'Profile Image',
    key,
    icon,
    remainingProfiles,
    initials,
    image,
    background,
    width = 100,
    height = 100,
}) => {
    return (
        <CircleImage
            width={width}
            height={height}
            background={background}
            key={key}
        >
            {!!image && (
                <img src={image} alt={alt} width={width} height={height} />
            )}
            {!!initials && <CircleContent>{initials}</CircleContent>}
            {!!remainingProfiles && (
                <CircleContent>{remainingProfiles}</CircleContent>
            )}
            {!!icon && <Icon as={AddUser} />}
        </CircleImage>
    );
};

interface ICircleImageProps {
    background: string;
    width: number;
    height: number;
}

const CircleImage = styled.li<ICircleImageProps>`
    ${flex('center')}
    align-items: center;
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    overflow: auto;
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    background: ${({ background }) => background || 'none'};
`;

const CircleContent = styled.div`
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 24px;
`;

const Icon = styled.svg`
    width: 35px;
    height: 35px;
`;
