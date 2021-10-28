import React from 'react';
import styled from 'styled-components';

export interface CustomerProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    profileName: string;
    profileImage: string;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
    profileName,
    profileImage,
    ...props
})


const ProfilePhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 999px;
`;