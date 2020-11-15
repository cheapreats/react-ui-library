import React, { useState } from 'react';
import styled from 'styled-components'
import { 
    DragDropContext, 
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';
import { ITemplatePrefill } from '/MiddleCanvasTypes';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TemplateProps extends MainInterface, ResponsiveInterface {
    isPreview?: boolean,
    templatePrefills: ITemplatePrefill
};

export const Template: React.FC<TemplateProps> = ({
    isPreview,
    templatePrefills,
    ...props
}): React.ReactElement => {
    const [items, setItems] = useState(Object.values(templatePrefills));

    const reorder = (list: ITemplatePrefill, startIndex: number, endIndex: number): ITemplatePrefill => {
        const result = Object.values(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };
    
    const onDrag = (result: DropResult): void => {
        const { source, destination } = result;
    
        if(!destination) {
            return;
        }

        const reorderedList = reorder(items, source.index, destination.index);
        setItems(reorderedList);
    };

    const getDraggableComponent = () => Object.values(items).map((templatePrefill: ITemplatePrefill, index) => (
        <Draggable
            key={templatePrefill.title}
            draggableId={templatePrefill.title}
            index={index}
            isDragDisabled={isPreview}
        >
            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                <DraggableWrapper
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    style={providedDraggable.draggableProps.style}
                    isDragging={snapshotDraggable.isDragging}
                >
                    {!isPreview && (
                        <Header>
                            {templatePrefill.title}
                        </Header>
                    )}
                    <DroppableElement
                        droppableLabels={templatePrefill.labels}
                        isPreview={isPreview}
                    />
                </DraggableWrapper>
            )}
        </Draggable>
    ));

    return (
        <Wrapper isPreview={isPreview} {...props}>
            <DragDropContext onDragEnd={onDrag}>
                <Droppable droppableId="templateDroppable">
                    {(provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {getDraggableComponent()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
}

interface WrapperProps {
    isPreview?: boolean;
};
const Wrapper = styled.div<WrapperProps>`
    width: 364px;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    margin: 3vh 0;
    padding: auto;
    ${({ theme, isPreview }): string => `
        border: dotted 0.5px ${theme.colors.text};
        background-color: ${theme.colors.background};
        padding: ${isPreview ? '10px 0 2px 0' : ''};
    `};
`;

interface DraggableWrapperProps {
    isDragging?: boolean;
};
const DraggableWrapper = styled.div<DraggableWrapperProps>`
    ${({ theme, isDragging }): string => `
        background-color: ${isDragging ? theme.colors.border : theme.colors.background};
        border: ${isDragging? `solid 1px ${theme.colors.text}` : theme.colors.background};
        padding-bottom: 10px;
    `};
`;

const Header = styled.div`
    margin: 5px 0 0 5px;
`;