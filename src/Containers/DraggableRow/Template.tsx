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

export interface TemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    /*Managable template that holds information for each element of the draggable row (by default a caption)*/
    templatePrefills: ITemplatePrefill[];
    /*Boolean that toggles if items are draggable or not*/
    draggable: boolean;
}

export const Template: React.FC<TemplateProps> = ({
    templatePrefills,
    draggable,
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

    

    const renderDraggableComponent = (drag:boolean) =>
        Object.values(items).map((templatePrefill, index) => {
            const {caption} = templatePrefill;
            return (
            <Draggable
                key={caption}
                draggableId={caption}
                index={index}>

                {(
                    providedDraggable: DraggableProvided,
                    snapshotDraggable: DraggableStateSnapshot,
                ) => {
                    const {innerRef, draggableProps, dragHandleProps} = providedDraggable;
                    return (
                        <DraggableWrapper
                            ref={innerRef}
                            style={draggableProps.style}
                            isDragging={snapshotDraggable.isDragging}
                            {...draggableProps}>
                            <Header>
                                {
                                    drag
                                    ? <div {...dragHandleProps}> <Icon as={ReOrderDotsVertical} /> </div>
                                    : <div> <Icon as={ReOrderDotsVertical} /> </div>
                                }
                                {caption}
                            </Header>
                        </DraggableWrapper>
                    )}
                }
            </Draggable>
            )
        });

    return (
        <ListWrapper>
            <ElementWrapper {...props}>
                <DragDropContext onDragEnd={onDrag}>
                    <Droppable droppableId="templateDroppable">
                        {(
                            provided: DroppableProvided,
                        ) => {
                            const {innerRef, droppableProps, placeholder} = provided
                            return (
                                <div ref={innerRef} {...droppableProps}>
                                    {renderDraggableComponent(draggable)}
                                    {placeholder}
                                </div>
                            )}
                        }
                    </Droppable>
                </DragDropContext>
            </ElementWrapper>
        </ListWrapper>
    );
};

const ListWrapper = styled.div`
    width: 100%;
    margin: 10px;
`;

const ElementWrapper = styled.div`
    width: 100%;
    font-weight: bold;    
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
        background-color: ${theme.colors.background};
    `};
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
    display: flex;
    ${({ theme }): string => `
        font-size: ${theme.font.size.small};
    `};
`;

const Icon = styled.svg`
    height: 20px;
    padding-right: 5px;
    padding-bottom: 1px;
`;
 