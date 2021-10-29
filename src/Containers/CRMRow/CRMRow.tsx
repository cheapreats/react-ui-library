import React from 'react';
import styled from 'styled-components';
import {
    CustomerProfile,
    CustomerProfileProps,
} from '../CustomerProfile/CustomerProfile';
import {
    CreatedDate,
    CreatedDateProps,
} from '../CreatedDate/CreatedDate';
import {
    TagGroup,
    TagGroupProps
} from '../TagGroup/TagGroup';

export interface CRMRowProps extends React.HTMLAttributes<HTMLTableRowElement> {

    dateCreated: CreatedDateProps;
    customerProfile: CustomerProfileProps;
    tags: TagGroupProps;

}

export const CRMRow: React.FC<CRMRowProps> = ({
    dateCreated,
    customerProfile,
    tags,
    ...props

}): React.ReactElement => (
    <CRMRowContainer {...props}>
        <CustomerProfileTD>
            <CustomerProfile {...customerProfile}  />
        </CustomerProfileTD>
        <TagGroupTD>
            <TagGroup {...tags} />
        </TagGroupTD>
        <CreatedDateTD>
            <CreatedDate {...dateCreated} />
        </CreatedDateTD>
    </CRMRowContainer>
);

const CRMRowContainer = styled.tr`
    display: flex;
    justify-content: between;
    width: 100%;
`;

const CustomerProfileTD = styled.td`
    width: 30%;
`;

const TagGroupTD = styled.td`
    width: 60%;
`;

const CreatedDateTD = styled.td`
    width: auto;
`;