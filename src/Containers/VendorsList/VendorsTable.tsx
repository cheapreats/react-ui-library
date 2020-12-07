import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { Profile, IProfileProps } from './Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsTableProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {

}

export const VendorsTable: React.FC<IVendorsTableProps> = ({
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            hello
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