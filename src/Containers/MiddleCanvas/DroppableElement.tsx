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
    styling: string, 
    isColumn: boolean
};

interface DroppableContainerProps {
    isDragging?: boolean,
    isColumn?: boolean
};

const FIRST_LABEL = 0;

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    styling,
    isColumn,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {Object.values(droppableLabels).map(droppableLabel => (
                <Droppable
                    droppableId={droppableLabel[FIRST_LABEL]}
                >
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <DroppableContainer
                            ref={provided.innerRef}
                            isDragging={snapshot.isDraggingOver}
                            isColumn={isColumn}
                            {...provided.droppableProps}      
                        >
                            <DroppableContainerContents 
                                styling={styling}
                                isColumn={isColumn}
                                droppableLabel={droppableLabel}
                            />
                        </DroppableContainer>
                    )}
                </Droppable>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div``;
const DroppableContainer = styled.div<DroppableContainerProps>`
    width: 349px;
    height: 35px;
    background-color: #f5f5f5;
    color: #b7b7b7;
    margin: 10px;
    border-radius: 4px;
    padding: 10px 0 0 0;
    ${({ isColumn }): string => `
        padding: ${isColumn ? '10px 0 2px 0' : ''};
    `};
    z-index: -9999;
`;