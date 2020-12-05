import React, { useState } from 'react';
import styled from 'styled-components';
import { ThreeBars } from '@styled-icons/octicons/ThreeBars';
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';
import { ITemplatePrefill, reorder } from './MiddleCanvasTypes';
import { TableComponent } from './TableComponent';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { scroll, media, flex } from '../../Utils/Mixins';

export interface TemplateProps extends MainInterface, ResponsiveInterface {
    isPreview?: boolean;
    templatePrefills: ITemplatePrefill;
}

export const Template: React.FC<TemplateProps> = ({
    isPreview,
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

    /**
     * Returns a header component based on component type
     * @param {string | undefined} componentType - type of component (like a table)
     * @param {string[][]} labels - labels needed to be mapped in each individual component
     */
    const conditionalHeaderComponent = (
        componentType: string | undefined,
        labels: string[][],
    ): React.ReactElement => {
        switch (componentType) {
            case 'table':
                return (
                    <TableComponent
                        droppableLabels={labels}
                        isPreview={isPreview}
                    />
                );
            default:
                return (
                    <DroppableElement
                        droppableLabels={labels}
                        isPreview={isPreview}
                    />
                );
        }
    };

    const renderDraggableComponent = () =>
        Object.values(items).map((templatePrefill, index) => (
            <Draggable
                key={templatePrefill.title}
                draggableId={templatePrefill.title}
                index={index}
                isDragDisabled={isPreview}
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
                        {!isPreview && (
                            <Header>
                                {templatePrefill.title}
                                <div {...providedDraggable.dragHandleProps}>
                                    <Icon as={ThreeBars} />
                                </div>
                            </Header>
                        )}
                        {conditionalHeaderComponent(
                            templatePrefill.componentType,
                            templatePrefill.labels,
                        )}
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
                            {renderDraggableComponent()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
};

interface WrapperProps {
    isPreview?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
    ${scroll};
    width: 30%;
    ${media(
        'tablet',
        `
        width: 100%
    `,
    )};
    ${({ theme, isPreview }): string => `
        font-size: ${theme.font.size.small};
        border: dotted 0.5px ${theme.colors.text};
        background-color: ${theme.colors.background};
        padding: ${isPreview ? '10px 0 2px 0' : ''};
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
    ${({ theme, isDragging }): string => `
        background-color: ${
            isDragging ? theme.colors.border : theme.colors.background
        };
        border: ${
            isDragging
                ? `solid 1px ${theme.colors.text}`
                : theme.colors.background
        };
        padding-bottom: 10px;
    `};
`;

const Header = styled.div`
    margin: 5px 0 0 5px;
    padding: 10px;
    display: flex;
    ${flex('space-between')};
    ${({ theme }): string => `
        font-size: ${theme.font.size.default};
    `};
`;

const Icon = styled.svg`
    padding-top: 3px;
    height: 25px;
    margin: 0 12px;
`;
