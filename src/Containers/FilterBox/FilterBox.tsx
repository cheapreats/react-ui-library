import React from 'react';
import styled from 'styled-components';
import {CircleWithCross} from '@styled-icons/entypo'

export interface FilterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    /*  Description of search category  */
    title: string,
    /*  Search term  */
    query: string
}

export const FilterBox: React.FC<FilterBoxProps> = ({
    title,
    query,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        <TagDiv>
            <TextSilver>
                {title}
            </TextSilver>
            <TextBold>
                {query}
            </TextBold>
            <CrossIcon/>
        </TagDiv>
    </Container>
);

const Container = styled.div`
    padding: 2px;
    display: inline-flex;
`;

const TagDiv = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.border};
        color: ${theme.colors.text};
    `}
    display: inline-flex;
    border-radius: 999px;
    padding: 2px;
    padding-left: 1rem;
    margin: 2px;
`;

const CrossIcon = styled(CircleWithCross)`
    margin: 2px;
    height: 18px;
    width: 18px;
    padding: 2px;
`;

const TextBold = styled.div`
    font-weight: bold;
    margin: 2px;
`;

const TextSilver = styled.div`
    margin: 2px;
`;
