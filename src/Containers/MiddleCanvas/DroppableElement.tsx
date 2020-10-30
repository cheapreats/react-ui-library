import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Droppable, 
    DroppableProvided, 
    DroppableStateSnapshot 
} from 'react-beautiful-dnd';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[],
    styling: string
};

interface DroppableContainerProps {
    isDragging: boolean,
    display: string
};

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    styling,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {Object.values(droppableLabels).map(droppableLabel => (
                <Droppable
                    droppableId={droppableLabel}
                >
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <DroppableContainer
                            ref={provided.innerRef}
                            isDragging={snapshot.isDraggingOver}
                            {...provided.droppableProps}
                            display={styling}
                        >
                            { droppableLabel }
                            { provided.placeholder }
                        </DroppableContainer>
                    )}
                </Droppable>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const DroppableContainer = styled.div<DroppableContainerProps>`
    width: 349px;
    height: 30px;
    background-color: #f5f5f5;
    color: #b7b7b7;
    margin: 10px;
    border-radius: 4px;
    display: flex;
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
    align-items: center;
`;