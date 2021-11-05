import React from 'react';
import styled from 'styled-components';

export interface ProfileModalProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /*  Name of the cell  */
    title: string;
    /* Direction of sort */
    sortDown: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    title,
    ...props
}): React.ReactElement => (
    <Modal {...props}>
        <TextBold>{title}</TextBold>
    </Modal>
);

const Modal = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        font-size: ${theme.font.size.h5}
    `}
    padding: 2px;
    margin: 2px;
    text-align: left;
    cursor: pointer;
`;

const TextBold = styled.div`
    display: inline;
    font-weight: bold;
    margin: 2px;
`;

