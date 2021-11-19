import React from 'react';
import styled from 'styled-components';
import { flex } from '../../Utils/Mixins';

export interface DroppableContainerContentsProps extends React.HTMLAttributes<HTMLDivElement> {
    /*A possible array of strings to be contained in element*/
    droppableLabel: string[];
}

export const DroppableContainerContents: React.FC<DroppableContainerContentsProps> = ({
    droppableLabel,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        {droppableLabel.map((label) => (
            <div key={label}>{label}</div>
        ))}
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('space-between')};
    div:only-child {
        margin: 0 auto;
    }
    padding: 10px;
`;
