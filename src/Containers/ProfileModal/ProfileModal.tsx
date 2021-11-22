import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal/Modal';
import { Tag, TagProps} from '../Tag/Tag';

export interface ProfileModalProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Image url */
    image: string;
    /*  Name of user  */
    name: string;
    /* Date of profile creation */
    date: string;
    /* [{text: value, icon: value}, {text: value, icon: value}] */
    tags: Array<TagProps>;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    image,
    name,
    tags,
    date,
    ...props
}): React.ReactElement => {
    /**
     * Displays the array of tags
     * @param tagComponents {Array}
     */
    const displayTags = (tagComponents: Array<TagProps>) => 
        tagComponents.map((tag) => (
            <div>
                <MyTag {...tag} />
            </div>
        ));
    const Modal1 = useState(true);

    return (
        <MyModal state={Modal1} {...props}>
            <ProfileImage 
                src={image}/>
            <Text>{name}</Text>
            <TextBold>Tags</TextBold>
            {displayTags(tags)}
            <TextBold>Date Created</TextBold>
            <TextSmall>{date}</TextSmall>
        </MyModal>
    );
}

const MyModal = styled(Modal)`
    ${({ theme }) => `
        color: ${theme.colors.text};
        font-size: ${theme.font.size.h5};
        padding: ${theme.dimensions.padding.container};
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
    margin-top: .75rem;
`;

const Text = styled.div`
    margin: 2px;
`;

const TextSmall = styled.div`
    ${({ theme }) => `
        font-size: ${theme.font.size.default};
    `}
    margin: 2px;
`;

const ProfileImage = styled.img`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
    `}
    width: 80px;
    height: 80px;
    border-radius: 999px;
`;

const MyTag = styled(Tag)`
    overflow: hidden;
`;
