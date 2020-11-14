import React from 'react';
import styled from 'styled-components';
import {
    Droppable, 
    DroppableProvided, 
    DroppableStateSnapshot 
} from 'react-beautiful-dnd';
import { DroppableContainerContents } from './DroppableContainerContents';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][],
    isColumn: boolean,
    isPreview?: boolean,
    styling: string
};

const FIRST_LABEL = 0;

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    isColumn,
    isPreview,
    styling,
    ...props
}): React.ReactElement => {
    const getDraggableObjects = droppableLabels.map(droppableLabel => (
        <Droppable
            droppableId={droppableLabel[FIRST_LABEL]}
        >
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <DroppableContainer
                    ref={provided.innerRef}
                    isDragging={snapshot.isDraggingOver}
                    {...provided.droppableProps}   
                    isPreview={isPreview}  
                >
                    <DroppableContainerContents 
                        styling={styling}
                        isColumn={isColumn}
                        droppableLabel={droppableLabel}
                    />
                </DroppableContainer>
            )}
        </Droppable>
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
    ${({ isColumn }): string => `
        padding: ${isColumn ? '10px 0 2px 0' : '10px 0 0 0'};
    `};
    margin: 10px;
    ${({ theme, isPreview }): string => `
        background-color: ${isPreview ? theme.colors.background : theme.colors.input.default};
        color: ${isPreview ? theme.colors.border : theme.colors.text}
        padding: ${isPreview ? '0 0 0 0' : '10px 0 0 0'};
        height: ${isPreview ? '10px' : '35px'};
    `}
`;