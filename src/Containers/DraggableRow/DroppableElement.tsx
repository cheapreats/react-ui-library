import React, { useState } from 'react';
import styled from 'styled-components';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';
import { reorder } from './DraggableRowTypes';
import { DroppableContainerContents } from './DroppableContainerContents';
import { media } from '../../Utils/Mixins';

const FIRST_LABEL = 0;

export interface DroppableElementProps extends React.HTMLAttributes<HTMLDivElement> {
    /*Array of labels and positions*/
    droppableLabels: string[][];
}

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    ...props
}): React.ReactElement => {
    const [items, setItems] = useState(droppableLabels);

    /**
     * Handles the draggable elements when dragged - required function
     * @param {DropResult} result - react-beautiful-dnd object that gives access to source and destination ids
     */
    const onDrag = (result: DropResult): void => {
        const { source, destination } = result;

        if (!destination) return;

        const reorderedList = reorder(items, source.index, destination.index);
        setItems(reorderedList);
    };

    const renderDraggableComponent = () =>
        droppableLabels.map((droppableLabel, index) => (
            <Draggable
                key={droppableLabel[FIRST_LABEL]}
                draggableId={droppableLabel[FIRST_LABEL]}
                index={index}
            >
                {(
                    providedDraggable: DraggableProvided,
                    snapshotDraggable: DraggableStateSnapshot,
                ) => (
                    <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={providedDraggable.draggableProps.style}
                    >
                        <DroppableContainer
                            isDragging={snapshotDraggable.isDragging}
                        >
                            <DroppableContainerContents
                                droppableLabel={droppableLabel}
                            />
                        </DroppableContainer>
                    </div>
                )}
            </Draggable>
        ));

    return (
        <div {...props}>
            <DragDropContext onDragEnd={onDrag}>
                <Droppable droppableId="templateDroppable">
                    {(provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {renderDraggableComponent()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

interface DroppableContainerProps {
    isDragging?: boolean;
    isColumn?: boolean;
}

const DroppableContainer = styled.div<DroppableContainerProps>`
    border-radius: 4px;
    margin: 15px;
    padding: 10px 0 0 0;
    height: 40px;
    text-align: left;
    ${media(
        'phone',
        `
        height: 60px;
    `,
    )};
    ${({ theme, isDragging }): string => `
        border: ${
    isDragging
        ? `solid 1px ${theme.colors.text}`
        : theme.colors.background
};
        background-color: ${theme.colors.input.default};
        color: ${theme.colors.text}
    `};
    ${({ theme }) =>`
        background-color: ${theme.colors.background};
        padding-top: 0;
        height: 10px;
    `};
`;
