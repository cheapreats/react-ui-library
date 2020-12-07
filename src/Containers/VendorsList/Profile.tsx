import React from 'react';
import styled from 'styled-components';
import { FeaturedProfile, IFeaturedProfileProps } from '../FeaturedProfile';
import { HeaderRow, HeaderRowProps } from '../HeaderRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IProfileProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    headerRowProps?: HeaderRowProps
}

export const Profile: React.FC<IProfileProps> = ({
    headerRowProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <FeaturedProfile 
                initials="EJ"
                background="orange" 
                key={1} 
            />
            <HeaderRow 
                {...headerRowProps}
                label="Emy Jackson" 
                type="h6" 
                display="column"
            >
                emy_jac@upmind.com
            </HeaderRow>
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