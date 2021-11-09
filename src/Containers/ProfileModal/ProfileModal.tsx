import React from 'react';
import styled from 'styled-components';

export interface ProfileModalProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Image url */
    image: string;
    /*  Name of user  */
    name: string;
    /* Date of profile creation */
    date: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    image,
    name,
    date,
    ...props
}): React.ReactElement => (
    <Modal {...props}>
        <ProfileImage 
            src={image}
        />
        <TextBold>{name}</TextBold>
        <TextBold>{date}</TextBold>
    </Modal>
);

const Modal = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        font-size: ${theme.font.size.h5}
    `}
    padding: 2px;
    margin: 2px;
`;

const TextBold = styled.div`
    font-weight: bold;
    margin: 2px;
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 999px;
    background-color: grey;
`;

const ModalTable = styled.table`
    width: 100%;    
    overflow: hidden;
`;
