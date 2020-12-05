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
import { reorder } from './MiddleCanvasTypes';
import { DroppableContainerContents } from './DroppableContainerContents';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { media } from '../../Utils/Mixins';

export interface DroppableElementProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][];
    isPreview?: boolean;
}

const FIRST_LABEL = 0;

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    isPreview,
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
                isDragDisabled={isPreview}
            >
                {(
                    providedDraggable: DraggableProvided,
                    snapshotDraggable: DraggableStateSnapshot,
                ) => (
                    <Wrapper
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={providedDraggable.draggableProps.style}
                    >
                        <DroppableContainer
                            isPreview={isPreview}
                            isDragging={snapshotDraggable.isDragging}
                        >
                            <DroppableContainerContents
                                droppableLabel={droppableLabel}
                            />
                        </DroppableContainer>
                    </Wrapper>
                )}
            </Draggable>
        ));

    return (
        <Wrapper {...props}>
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
        </Wrapper>
    );
};

const Wrapper = styled.div``;

interface DroppableContainerProps {
    isDragging?: boolean;
    isColumn?: boolean;
    isPreview?: boolean;
}
const DroppableContainer = styled.div<DroppableContainerProps>`
    border-radius: 4px;
    margin: 15px;
    padding: 10px 0 0 0;
    height: 40px;
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
    ${({ theme, isPreview }) =>
        isPreview &&
        `
        background-color: ${theme.colors.background};
        padding-top: 0;
        height: 10px;
    `};
`;
