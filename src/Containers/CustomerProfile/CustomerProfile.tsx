import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '@styled-icons/fa-solid/User';

export interface CustomerProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    /* The name passed in */
    profileName: string;
    /* The image passed in */
    profileImage: string;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
    profileName,
    profileImage,
    ...props
}): React.ReactElement => {
    /**
     * Displays the passed in image if valid, otherwise displays a default image
     */
    const [isImageError, setIsImageError] = useState(false);

    const onImageError = () => {
        setIsImageError(true);
    }
    return (
        <Container {...props}>
            {!isImageError ? (<ProfilePhoto
                src={profileImage || ''}
                alt="Profile Image"
                onError={onImageError}
            />
            ) : (
                <DefaultPhoto
                    as={User}
                />
            )}
            <ProfileName>{profileName}</ProfileName>
        </Container>
    );

}

const Container = styled.div`
    display: flex;
`;

const ProfilePhoto = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const DefaultPhoto = styled.svg`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const ProfileName = styled.p`
    align-self: center;
    display: inline;
    font-size: 12px;
    margin: 0;
    margin-left: 0.5rem;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;