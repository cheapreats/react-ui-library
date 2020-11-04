import React from 'react';
import styled from 'styled-components';
import {
    Droppable, 
    DroppableProvided, 
    DroppableStateSnapshot 
} from 'react-beautiful-dnd';
import { StyledIcon } from 'styled-icons/types';
import { DroppableContainerContents } from './DroppableContainerContents';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][] | StyledIcon [][],
    styling: string, 
    isColumn: boolean,
    isPreview?: boolean
};

interface DroppableContainerProps {
    isDragging?: boolean,
    isColumn?: boolean,
    isPreview?: boolean
};

const FIRST_LABEL = 0;
const DESIGN_BACKGROUND_COLOR = '#ffffff';
const PREVIEW_BACKGROUND_COLOR = '#f5f5f5';
const DESIGN_COLOR = '#b7b7b7';
const PREVIEW_COLOR = 'black';

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    styling,
    isColumn,
    isPreview,
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
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div``;
const DroppableContainer = styled.div<DroppableContainerProps>`
    width: 349px;
    border-radius: 4px;
    ${({ isColumn }): string => `
        padding: ${isColumn ? '10px 0 2px 0' : '10px 0 0 0'};
    `};
    margin: 10px;
    ${({ isPreview }): string => `
        background-color: ${isPreview ? DESIGN_BACKGROUND_COLOR : PREVIEW_BACKGROUND_COLOR};
        color: ${isPreview ? DESIGN_COLOR : PREVIEW_COLOR}
        padding: ${isPreview ? '0px 0 0 0' : '10px 0 0 0'};
        height: ${isPreview ? '10px' : '35px'};
    `}
`;