import React from 'react';
import styled from 'styled-components';

export interface CreatedDateProps extends React.HTMLAttributes<HTMLDivElement> {
    /* Date of creation passed in */
    dateCreated: String;
}

export const CreatedDate: React.FC<CreatedDateProps> = ({
    /* Date created property passed in */
    dateCreated,
    ...props
}): React.ReactElement => (
    <Date dateCreated={dateCreated} {...props}>
        {dateCreated}
    </Date>
);

const Date = styled.div<CreatedDateProps>`
    ${({ theme }) => `
        color:${theme.colors.text};
    `}
`;