import React from 'react';
import styled from 'styled-components';
import {CircleWithCross} from '@styled-icons/entypo'

export interface FilterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    /*  This is a comment  */
    query: string
}

export const FilterBox: React.FC<FilterBoxProps> = ({
    title, query,
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
    //border: 1px solid black;
    display: inline-flex;
    background-color: #e5e7ea;

    display: inline-flex;
    border-radius: 999px;
    padding: 2px;
    padding-left: 4px;
    margin: 2px;
`;

const CrossIcon = styled(CircleWithCross)`
    margin: 2px;
    height: 20px;
    width: 20px;
`;

const TextBold = styled.div`
    font-weight: bold;
    margin: 2px;
`;

const TextSilver = styled.div`
    color: 96989c;
    margin: 2px;
`;