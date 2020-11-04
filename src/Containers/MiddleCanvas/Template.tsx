import React from 'react';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd';
import { ITemplatePrefill } from '/MiddleCanvasElements';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TemplateProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isPreview?: boolean,
    onDragEnd: () => void,
    templatePrefills: ITemplatePrefill
};

interface WrapperProps {
    isPreview?: boolean;
};

const TEMPLATE_BORDER_COLOR ='#4a4a4a';
const BACKGROUND_COLOR = '#ffffff';

export const Template: React.FC<TemplateProps> = ({
    onDragEnd,
    isPreview,
    templatePrefills,
    ...props
}): React.ReactElement => {
    const templatePrefillTitles = Object.values(templatePrefills).map((templatePrefill: ITemplatePrefill) => {
        return templatePrefill.title;
    });

    const templatePrefillLabels = Object.values(templatePrefills).map((templatePrefill: ITemplatePrefill) => {
        return templatePrefill.labels;
    });

    const templatePrefillDisplays = Object.values(templatePrefills).map((templatePrefill: ITemplatePrefill) => {
        return templatePrefill.display;
    });

    const templatePrefillColumn = Object.values(templatePrefills).map((templatePrefill: ITemplatePrefill) => {
        return templatePrefill.column;
    });

    return (
        <Wrapper 
            isPreview={isPreview}
            {...props}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.values(templatePrefills).map((TemplatePrefill, index) => (
                    <>
                        {!isPreview && (
                            <Header>
                                {templatePrefillTitles[index]}
                            </Header>
                        )}
                        <DroppableElement
                            droppableLabels={templatePrefillLabels[index]}
                            styling={templatePrefillDisplays[index]}
                            isColumn={templatePrefillColumn[index]}
                            isPreview={isPreview}
                        />
                    </>
                ))}
            </DragDropContext>
        </Wrapper>
    );
}

const Wrapper = styled.div<WrapperProps>`
    width: 364px;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    border: dotted 0.5px ${TEMPLATE_BORDER_COLOR};
    background-color: ${BACKGROUND_COLOR};
    margin: 3vh 0;
    padding: auto;
    ${({ isPreview }): string => `
        padding: ${isPreview ? '10px 0 2px 0' : ''};
    `};
`;
const Header = styled.div`
    margin: 5px 0 0 5px;
`;