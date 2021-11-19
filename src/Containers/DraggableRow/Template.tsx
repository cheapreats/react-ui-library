import React, { useState } from 'react';
import styled from 'styled-components';
import { ReOrderDotsVertical } from '@styled-icons/fluentui-system-filled/ReOrderDotsVertical';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';
import { ITemplatePrefill, reorder } from './DraggableRowTypes';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { scroll, media } from '../../Utils/Mixins';

export interface TemplateProps extends MainInterface, ResponsiveInterface {
    /*Managable template that holds information for each element of the draggable row (by default a caption)*/
    templatePrefills: ITemplatePrefill;
}

export const Template: React.FC<TemplateProps> = ({
    templatePrefills,
    ...props
}): React.ReactElement => {
    const [items, setItems] = useState<ITemplatePrefill[]>(
        Object.values(templatePrefills),
    );

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
        Object.values(items).map((templatePrefill, index) => (
            <Draggable
                key={templatePrefill.caption}
                draggableId={templatePrefill.caption}
                index={index}
            >
                {(
                    providedDraggable: DraggableProvided,
                    snapshotDraggable: DraggableStateSnapshot,
                ) => (
                    <DraggableWrapper
                        ref={providedDraggable.innerRef}
                        style={providedDraggable.draggableProps.style}
                        isDragging={snapshotDraggable.isDragging}
                        {...providedDraggable.draggableProps}
                    >
                        <Header>
                            <div {...providedDraggable.dragHandleProps}>
                                <Dots as={ReOrderDotsVertical} />
                            </div>
                            {templatePrefill.caption}
                        </Header>
                        {DroppableElement}
                    </DraggableWrapper>
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

const Wrapper = styled.div`
    ${scroll};
    width: 30%;
    ${media(
        'tablet',
        `
        width: 100%
    `,
    )};
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
        background-color: ${theme.colors.background};
        padding: ${'10px 0 2px 0'};
    `};
    font-weight: bold;
    line-height: 1.25;
    margin: 3vh 0;
    padding: auto;
`;

interface DraggableWrapperProps {
    isDragging?: boolean;
}

const DraggableWrapper = styled.div<DraggableWrapperProps>`
    border-radius: 5px;
    ${({ theme, isDragging }): string => `
        background-color: ${
            isDragging ? theme.colors.border : theme.colors.background
        };
    `};
`;

const Header = styled.div`
    border-radius: 5px;
    padding-top: 2px;
    display: flex;
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `};
`;

const Dots = styled.svg`
    height: 20px;
    padding-right: 5px;
    padding-bottom: 1px;
`;
