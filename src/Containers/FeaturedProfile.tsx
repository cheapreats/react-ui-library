import React from 'react';
import styled from 'styled-components';
import { flex } from '../Utils/Mixins';

export interface IFeaturedProfileProps {
    background: string;
    profile: IProfile;
}

export interface IProfile {
    image: string;
    initials: string;
    id: number;
}

export const IconCircle: React.FC = ({ children }) => {
    return <CircleImage background="gray">{children}</CircleImage>;
};

export const FeaturedProfile: React.FC<IFeaturedProfileProps> = ({
    children,
    background,
    profile,
}) => {
    return (
        <CircleImage background={background} key={profile.id}>
            {children}
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
    object-fit: cover;
    overflow: auto;
    width: 100px;
    height: 100px;
    background: ${({ background }) => background || 'none'};
`;
