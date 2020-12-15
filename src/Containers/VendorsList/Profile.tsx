import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FeaturedProfile, IFeaturedProfileProps } from '../FeaturedProfile';
import { HeaderRow, HeaderRowProps } from '../HeaderRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IProfileProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    key: number;
    name?: string;
    email?: string;
    imageUrl?: string;
    headerRowProps?: HeaderRowProps;
    profileProps?: Omit<IFeaturedProfileProps, 'key, background'>;
}

const MATCH_FIRST_LETTER = /\b\w/g;
const PROFILE_WIDTH = 50;
const PROFILE_HEIGHT = 50;

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
        const initials = inputName.match(MATCH_FIRST_LETTER) || [];
        const profileInitials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return profileInitials;
    };

    /**
     * Returns profile component based on whether an imageurl is provided 
     * @param inputName {string} - person's name
     * @param image {string} - image's url
     */
    const getProfiles = (inputName: string, image?: string) => {
        const profileInitials = getInitials(inputName);

        switch(true) {
        case image === undefined:
            return (
                <FeaturedProfile 
                    background={theme.colors.primary}
                    initials={profileInitials}
                    key={key} 
                    width={PROFILE_WIDTH}
                    height={PROFILE_HEIGHT}
                    {...profileProps}
                />
            )
        default:
            return (
                <FeaturedProfile 
                    image={image}
                    background='none'
                    key={key} 
                    width={PROFILE_WIDTH}
                    height={PROFILE_HEIGHT}
                    {...profileProps}
                />
            );
        }
    };

    return (
        <Wrapper {...props}>
            {getProfiles(name, imageUrl)}
            <SHeaderRow 
                key={key}
                label={name} 
                type='h6' 
                display='column'
                size={theme.font.size.default}
                {...headerRowProps}
            >
                {email}
            </SHeaderRow>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row')};
    ${media(
        'phone',
        `
        ${flex('column', 'center')};
    `)};
`;

const SHeaderRow = styled(HeaderRow)`
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `}
`