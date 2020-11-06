import React from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';

import { flex } from '../Utils/Mixins';

export interface IFeaturedProfileProps {
    background: string;
    image?: string;
    initials?: string;
    profilesRemaining?: number;
    icon?: boolean;
    key: number;
}

export const FeaturedProfile: React.FC<IFeaturedProfileProps> = ({
    key,
    icon,
    profilesRemaining,
    initials,
    image,
    background,
}) => {
    return (
        <CircleImage background={background} key={key}>
            <CircleContent>
                {!!image && <img src={image} alt={initials} />}
                {!!initials && <p>{initials}</p>}
                {!!profilesRemaining && <p>{profilesRemaining}</p>}
                {!!icon && <Icon as={AddUser} />}
            </CircleContent>
        </CircleImage>
    );
};

interface ICircleImageProps {
    background: string;
}

const CircleImage = styled.li<ICircleImageProps>`
    ${flex()}
    justify-content: center;
    align-items: center;
    border: solid white 3px;
    border-radius: 50%;
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
    background-size: contain;
    background-repeat: no-repeat;
`;

const Icon = styled.svg`
    width: 35px;
    height: 35px;
`;
