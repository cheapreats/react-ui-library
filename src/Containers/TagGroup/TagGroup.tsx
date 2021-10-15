import React from 'react';
import styled from 'styled-components';



export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    tags: Array<string>
};

export const TagGroup: React.FC<TagGroupProps> = ({
    tags,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        {tags.join()}
    </Container>
);

const Container = styled.div`
    border: 1px solid black;
`;