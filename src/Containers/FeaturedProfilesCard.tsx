import React from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';
import { flex } from '../Utils/Mixins';

export interface profile {
    image: string;
    initials: string;
    id: number;
}

export interface FeaturedProfilesCardProps {
    profileData: profile[];
    alt: string;
    width?: number;
    height?: number;
}

export const FeaturedProfilesCard: React.FC<FeaturedProfilesCardProps> = ({
    alt,
    profileData,
    width = 100,
    height = 100,
}): React.ReactElement => {
    const getProfileCircles = (
        index: any,
        profile: any,
    ): React.ReactElement => {
        if (index < 3) {
            return (
                <CircleImage background="none" key={profile.image}>
                    <img
                        src={profile.image}
                        alt={alt}
                        height={height}
                        width={width}
                    />
                </CircleImage>
            );
        }
        if (index > 2 && index < 5) {
            return (
                <CircleImage background="orange">
                    <CircleContent>{profile.initials}</CircleContent>
                </CircleImage>
            );
        }
        if (index > 4 && index < 6) {
            return (
                <CircleImage background="grey">
                    <CircleContent>{profileData.length - 5}</CircleContent>
                </CircleImage>
            );
        }
        return (
            <CircleImage background="grey">
                <Icon as={AddUser} />
            </CircleImage>
        );
    };

    return (
        <Container>
            {profileData
                .map(
                    (profile, index): React.ReactElement =>
                        getProfileCircles(index, profile),
                )
                .splice(0, 7)}
        </Container>
    );
};

interface CircleImageProps {
    background: string;
}

const CircleImage = styled.li<CircleImageProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid white 3px;
    border-radius: 50%;
    object-fit: cover;
    overflow: auto;
    width: 100px;
    height: 100px;
    background: ${({ background }) => background || 'none'};

    :nth-child(1) {
        position: relative;
    }
    :nth-child(2) {
        margin-left: -2%;
    }
    :nth-child(3) {
        margin-left: -2%;
        z-index: -1;
    }
    :nth-child(4) {
        margin-left: -2%;
        z-index: -2;
    }
    :nth-child(n + 5) {
        margin-left: -2%;
        z-index: -3;
    }
`;

const CircleContent = styled.p`
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 24px;
`;

const Container = styled.ul`
    ${flex('row')}
    padding: 5px;
`;

const Icon = styled.svg`
    width: 35px;
    height: 35px;
`;
