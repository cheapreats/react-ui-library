import React from 'react';
import styled from 'styled-components';

/* CONSTS */

export interface CreatedDateProps extends React.HTMLAttributes<HTMLDivElement> {
    /* Date of creation passed in */
    dateCreated: String;
}

export const CreatedDate: React.FC<CreatedDateProps> = ({
    /* Notification prop passed in */
    dateCreated,
    ...props
}): React.ReactElement => (
    <div {...props}>
        <Date dateCreated={dateCreated}>
            {dateCreated}
        </Date>

    </div>

);

const Date = styled.div<CreatedDateProps>`

    ${({ theme }) => `
        color:${theme.colors.text};
    `}
`;