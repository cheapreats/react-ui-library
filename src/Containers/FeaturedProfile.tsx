import React from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';
import { flex } from '../Utils/Mixins';

export interface IFeaturedProfileProps {
    background: string;
    key: number;
    image?: string;
    initials?: string;
    profilesRemaining?: number;
    icon?: boolean;
    width?: number;
    height?: number;
    alt?: string;
}

export const FeaturedProfile: React.FC<IFeaturedProfileProps> = ({
    alt = 'Profile Image',
    key,
    icon,
    profilesRemaining,
    initials,
    image,
    background,
    width = 100,
    height = 100,
}) => {
    return (
        <CircleImage background={background} key={key}>
            {!!image && (
                <img src={image} alt={alt} width={width} height={height} />
            )}
            {!!initials && <CircleContent>{initials}</CircleContent>}
            {!!profilesRemaining && (
                <CircleContent>{profilesRemaining}</CircleContent>
            )}
            {!!icon && <Icon as={AddUser} />}
        </CircleImage>
    );
};

interface ICircleImageProps {
    background: string;
}

const CircleImage = styled.li<ICircleImageProps>`
    ${flex('center')}
    align-items: center;
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    overflow: auto;
    width: 100px;
    height: 100px;
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
