import React from 'react';
import styled from 'styled-components';
import { Profile, IProfileProps } from './Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsTableProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    data: IProfileProps[];
    profileProps: IProfileProps;
};

export const VendorsTable: React.FC<IVendorsTableProps> = ({
    data,
    profileProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {data.map(profile => (
                <Profile
                    {...profileProps}
                    key={profile.key}
                    name={profile.name}
                    email={profile.email}
                    imageUrl={profile?.imageUrl}
                />
            ))}
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