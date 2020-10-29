import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';
import { flex } from '../Utils/Mixins';

const PROFILE_PICTURE_LIMIT = 3;
const PROFILE_INITIALS_START_INDEX = 2;
const PROFILE_INITIALS_END_INDEX = 5;
const REMAINING_PROFILES_INDEX = 5;
const MAX_PROFILES = 7;
const START_FROM_PROFILE_INDEX = 0;

export interface IProfile {
    image: string;
    initials: string;
    id: number;
}

export interface IFeaturedProfilesCardProps {
    profileData: IProfile[];
    alt: string;
    width?: number;
    height?: number;
    onClick?: Function;
}

export const FeaturedProfilesCard: React.FC<IFeaturedProfilesCardProps> = ({
    onClick = (): void => {
        return undefined;
    },
    alt,
    profileData,
    width = 100,
    height = 100,
}): React.ReactElement => {
    const getProfileCircles = useCallback(() => {
        const profiles = profileData.slice(
            START_FROM_PROFILE_INDEX,
            MAX_PROFILES,
        );

        const userProfilePicture = (profile: IProfile): React.ReactElement => {
            return (
                <CircleImage background="none" key={profile.id}>
                    <img
                        src={profile.image}
                        alt={alt}
                        height={height}
                        width={width}
                    />
                </CircleImage>
            );
        };

        const userInitials = (profile: IProfile): React.ReactElement => {
            return (
                <CircleImage background="orange" key={profile.id}>
                    <CircleContent>{profile.initials}</CircleContent>
                </CircleImage>
            );
        };

        const remainingUserProfiles = (
            profile: IProfile,
        ): React.ReactElement => {
            const remaining_profiles_value =
                profileData.length - REMAINING_PROFILES_INDEX;

            return (
                <CircleImage background="grey" key={profile.id}>
                    <CircleContent>{remaining_profiles_value}</CircleContent>
                </CircleImage>
            );
        };

        const addUserIcon = (profile: IProfile): React.ReactElement => {
            return (
                <CircleImage
                    key={profile.id}
                    background="grey"
                    onClick={(): void => onClick(profile)}
                >
                    <Icon as={AddUser} />
                </CircleImage>
            );
        };

        return profiles.map(
            (profile: IProfile, index: number): React.ReactElement => {
                if (index < PROFILE_PICTURE_LIMIT) {
                    return userProfilePicture(profile);
                }
                if (
                    index > PROFILE_INITIALS_START_INDEX &&
                    index < PROFILE_INITIALS_END_INDEX
                ) {
                    return userInitials(profile);
                }
                if (index === REMAINING_PROFILES_INDEX) {
                    return remainingUserProfiles(profile);
                }
                return addUserIcon(profile);
            },
        );
    }, [profileData]);

    return <Container>{getProfileCircles()}</Container>;
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
