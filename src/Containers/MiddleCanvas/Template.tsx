import React from 'react';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd';
import { ITemplatePrefill } from '/MiddleCanvasTypes';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TemplateProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isPreview?: boolean,
    onDragEnd: () => void,
    templatePrefills: ITemplatePrefill
};

export const Template: React.FC<TemplateProps> = ({
    onDragEnd,
    isPreview,
    templatePrefills,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper 
            isPreview={isPreview}
            {...props}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.values(templatePrefills).map((templatePrefill: ITemplatePrefill) => (
                    <>
                        {!isPreview && (
                            <Header>
                                {templatePrefill.title}
                            </Header>
                        )}
                        <DroppableElement
                            droppableLabels={templatePrefill.labels}
                            isColumn={templatePrefill.column}
                            styling={templatePrefill.styling}
                            isPreview={isPreview}
                        />
                    </>
                ))}
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
    ${({ theme }): string => `
        border: dotted 0.5px ${theme.colors.text};
        background-color: ${theme.colors.background};
    `};
    margin: 3vh 0;
    padding: auto;
    ${({ isPreview }): string => `
        padding: ${isPreview ? '10px 0 2px 0' : ''};
    `};
`;

const Header = styled.div`
    margin: 5px 0 0 5px;
`;