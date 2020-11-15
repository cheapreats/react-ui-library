import React from 'react';
import styled from 'styled-components';
import { DroppableContainerContents } from './DroppableContainerContents';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][],
    isPreview?: boolean,
};

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    isPreview,
    ...props
}): React.ReactElement => {
    const getDraggableObjects = droppableLabels.map((droppableLabel) => (
        <DroppableContainer isPreview={isPreview}>
            <DroppableContainerContents droppableLabel={droppableLabel} />
        </DroppableContainer>
    ));

    return (
        <Wrapper {...props}>
            {getDraggableObjects}
        </Wrapper>
    );
}

const Wrapper = styled.div``;

interface DroppableContainerProps {
    isDragging?: boolean,
    isColumn?: boolean,
    isPreview?: boolean
};
const DroppableContainer = styled.div<DroppableContainerProps>`
    width: 349px;
    border-radius: 4px;
    margin: 10px;
    ${({ theme, isPreview }): string => `
        background-color: ${isPreview ? theme.colors.background : theme.colors.input.default};
        color: ${isPreview ? theme.colors.border : theme.colors.text}
        padding: ${isPreview ? '0 0 0 0' : '10px 0 0 0'};
        height: ${isPreview ? '10px' : '35px'};
    `}
`;