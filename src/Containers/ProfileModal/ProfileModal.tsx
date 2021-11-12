import React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal/Modal';
import { Tag } from '../Tag/Tag';

export interface ProfileModalProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Image url */
    image: string;
    /*  Name of user  */
    name: string;
    /* Date of profile creation */
    date: string;
    /* Placeholder text for tags */
    tags: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    image,
    name,
    tags = {Tag},
    date,
    ...props
}): React.ReactElement => (
    <MyModal state={[true, () => true]} {...props}>
        <ProfileImage 
            src={image}
        />
        <TextBold>{name}</TextBold>
        <MyTag>
            {tags}
        </MyTag>
        <MyTag>
            {tags}
        </MyTag>
        <TextBold >{date}</TextBold>
    </MyModal>
);

const MyModal = styled(Modal)`
    ${({ theme }) => `
        color: ${theme.colors.text};
        font-size: ${theme.font.size.h5}
    `}
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    justify-content: center;
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

const MyTag = styled(Tag)`
    width: 90%;
    overflow: hidden;
`;
