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

/* Define our `fg` and `bg` on the theme */
const theme = {
    main: "#85878a",
    fg: "white",
    bg: "#e6e7eb"
};

/* This theme swaps fg and bg */
const invertTheme = ({ main, fg, bg}) => ({
    main: "silver",
    fg: bg,
    bg: fg
});

const TagDiv = styled.div`
    //border: 1px solid black;
    display: inline-flex;
    background-color: ${theme.bg};

    display: inline-flex;
    //border: 2px solid ${theme.bg};
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
    //color: 96989c;
    color: ${theme.main};
    margin: 2px;
`;