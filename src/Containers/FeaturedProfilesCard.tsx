import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AddUser } from '@styled-icons/entypo/AddUser';
import { flex } from '../Utils/Mixins';
import { FeaturedProfile, IconCircle } from './FeaturedProfile';

const PROFILE_PICTURE_LIMIT = 3;
const PROFILE_INITIALS_INDEX_ENDPOINT = 1;
const PROFILE_PICTURE_BREAKPOINT = 4;
const SUBTRACTED_PROFILE_PICTURE = 1;
const START_FROM_PROFILE_INDEX = 0;
const MAX_PROFILES = 6;

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
}

export const FeaturedProfilesCard: React.FC<IFeaturedProfilesCardProps> = ({
    alt,
    profileData,
    width = 100,
    height = 100,
}): React.ReactElement => {
    const getProfileCircles = useCallback(() => {
        const getProfilePictureLimit = () => {
            if (profileData.length < PROFILE_PICTURE_BREAKPOINT) {
                return PROFILE_PICTURE_LIMIT - SUBTRACTED_PROFILE_PICTURE;
            }
            return PROFILE_PICTURE_LIMIT;
        };

        const determineMaxProfileLength = () => {
            if (profileData.length < MAX_PROFILES) {
                return profileData.length;
            }
            return MAX_PROFILES;
        };

        const profiles = profileData.slice(
            START_FROM_PROFILE_INDEX,
            determineMaxProfileLength(),
        );

        const profileInitialsEndIndex =
            profiles.length - PROFILE_INITIALS_INDEX_ENDPOINT;

        const getProfiles = (
            profile: IProfile,
            index: number,
        ): React.ReactElement => {
            switch (true) {
                case index < getProfilePictureLimit():
                    return (
                        <FeaturedProfile profile={profile} background="none">
                            <img
                                src={profile.image}
                                alt={alt}
                                height={height}
                                width={width}
                            />
                        </FeaturedProfile>
                    );
                case index < profileInitialsEndIndex:
                    return (
                        <FeaturedProfile profile={profile} background="orange">
                            <CircleContent>{profile.initials}</CircleContent>
                        </FeaturedProfile>
                    );
                default:
                    return (
                        <FeaturedProfile profile={profile} background="gray">
                            <CircleContent>
                                {profileData.length - profileInitialsEndIndex}
                            </CircleContent>
                        </FeaturedProfile>
                    );
            }
        };

        return profiles.map(
            (profile, index): React.ReactElement => {
                return getProfiles(profile, index);
            },
        );
    }, [profileData]);

    return (
        <Container>
            {getProfileCircles()}
            <IconCircle>
                <Icon as={AddUser} />
            </IconCircle>
        </Container>
    );
};

const CircleContent = styled.p`
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 24px;
`;

const Container = styled.ul`
    ${flex('row')}
    padding: 5px;

    li:nth-child(1) {
        position: relative;
    }
    li:nth-child(2) {
        margin-left: -1%;
    }
    li:nth-child(3) {
        margin-left: -1%;
        z-index: -1;
    }
    li:nth-child(4) {
        margin-left: -1%;
        z-index: -2;
    }
    li:nth-child(n + 5) {
        margin-left: -1%;
        z-index: -3;
    }
`;

const Icon = styled.svg`
    width: 35px;
    height: 35px;
`;
