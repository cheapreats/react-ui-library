import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
    FeaturedProfile,
    IFeaturedProfileProps,
} from '../FeaturedProfile/FeaturedProfile';
import { HeaderRow, HeaderRowProps } from '../HeaderRow/HeaderRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IProfileProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    key: number;
    name: string;
    email: string;
    imageUrl?: string;
    headerRowProps?: HeaderRowProps;
    profileProps?: Omit<IFeaturedProfileProps, 'key' | 'background'>;
}

const MATCH_FIRST_LETTER = /\b\w/g;
const EMPTY_STRING = '';
const EMPTY_ARRAY: any[] = [];
const NO_BACKGROUND_IMAGE = 'none';
const NO_INITIALS = '';
const PROFILE_WIDTH = 60;
const PROFILE_HEIGHT = 60;

export const Profile: React.FC<IProfileProps> = ({
    key,
    name,
    email,
    imageUrl,
    headerRowProps,
    profileProps,
    ...props
}): React.ReactElement => {
    const theme = useTheme();

    /**
     * Returns initials of a person's full name
     * @param inputName{string} - person's name
     */
    const getInitials = (inputName: string) => {
        const initials = inputName.match(MATCH_FIRST_LETTER) || EMPTY_ARRAY;
        const profileInitials = (
            (initials.shift() || EMPTY_STRING) +
            (initials.pop() || EMPTY_STRING)
        ).toUpperCase();
        return profileInitials;
    };

    /**
     * Returns profile component based on whether an imageurl is provided
     * @param inputName {string} - person's name
     * @param id {number} - id for key
     * @param image {string} - image's url
     */
    const getProfiles = (inputName: string, id: number, image?: string) => {
        const profileInitials = getInitials(inputName);
        const getDefaultProfileProps = {
            key: id,
            width: PROFILE_WIDTH,
            height: PROFILE_HEIGHT,
            background: image ? NO_BACKGROUND_IMAGE : theme.colors.primary,
            initials: image ? NO_INITIALS : profileInitials,
        };

        return (
            <FeaturedProfile
                image={image}
                {...getDefaultProfileProps}
                {...profileProps}
            />
        );
    };

    return (
        <Wrapper {...props}>
            {getProfiles(name, key, imageUrl)}
            <SHeaderRow
                key={key}
                label={name}
                type="h6"
                display="column"
                size={theme.font.size.default}
                {...headerRowProps}
            >
                {email}
            </SHeaderRow>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row', 'flex-start')};
    margin-left: 10px;
    ${media(
        'phone',
        `
        ${flex('column', 'center')};
    `,
    )};
`;

const SHeaderRow = styled(HeaderRow)`
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `}
`;
