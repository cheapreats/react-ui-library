import React, { useCallback } from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { FeaturedProfile } from '../FeaturedProfile/FeaturedProfile';

const PROFILE_PICTURE_LIMIT = 3;
const PROFILE_INITIALS_INDEX_ENDPOINT = 1;
const PROFILE_PICTURE_BREAKPOINT = 4;
const SUBTRACTED_PROFILE_PICTURE = 1;
const START_FROM_PROFILE_INDEX = 0;
const MAX_PROFILES = 6;
const ADD_USER_ICON_KEY = 1;
const SUBTRACTED_REMAINING_PROFILE = 1;

export interface IProfile {
    image: string;
    initials: string;
    id: number;
}

export interface IFeaturedProfilesCardProps {
    profileData: IProfile[];
    counterBool: boolean;
}

export const FeaturedProfilesCard: React.FC<IFeaturedProfilesCardProps> = ({
    profileData, //the array of profiles to be displayed
    counterBool, //if true, the profile counter is displayed, and if false, the counter is not displayed
    ...props
}): React.ReactElement => {
    const renderProfileCircles = useCallback(() => {
        const determineProfilePictureLimit = () => {
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

        const remainingProfiles =
            profileData.length -
            (determineMaxProfileLength() - SUBTRACTED_REMAINING_PROFILE);

        const getProfiles = (
            profile: IProfile,
            index: number,
        ): React.ReactElement => {
            const featuredProfileProps = {
                key: profile.id,
                background: 'none'
            };

            switch (true) {
            case index < determineProfilePictureLimit():
                featuredProfileProps['image'] = profile.image;

            case index < profileInitialsEndIndex:
                featuredProfileProps['initials'] = profile.initials;
                featuredProfileProps['background'] = "orange";

            default:
                featuredProfileProps['remainingProfiles'] = {remainingProfiles};
                featuredProfileProps['background'] = "gray";
            }

            return (
                <FeaturedProfile {...featuredProfileProps}/>
            )
        };

        return profiles.map(
            (profile, index): React.ReactElement => getProfiles(profile, index),
        );
    }, [profileData]);

    return (
        <Holder>
            <Container>
                {renderProfileCircles()}
                <FeaturedProfile icon key={ADD_USER_ICON_KEY} background="grey" />
            </Container>
            {counterBool && <CountContainer>{profileData.length}</CountContainer>}
        </Holder>
            
    );
};

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

const CountContainer = styled.div`
    font-size 40px;
    height 150px;
    line-height 150px;
    text-align:center;
`
const Holder = styled.div`
    display: flex;
`