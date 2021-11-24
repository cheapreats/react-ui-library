import React from 'react';
import styled from 'styled-components';
import  {IFeaturedProfilesCardProps}  from 'index';

export const FeaturedProfilesCount: React.FC<IFeaturedProfilesCardProps> = ({
    profileData, //the array of profiles to be displayed.
    ...props
}): React.ReactElement => (
    <CountContainer>{profileData.length}</CountContainer>
)

const CountContainer = styled.span`
    position: relative;
    top: -105px;
    left: 660px; 
    color: black;
    font-size: 50px
    
`;

//todo Make location change with amount of profiles (currently having issues trying to make Featured profile card not generate a new line without being able to edit it)