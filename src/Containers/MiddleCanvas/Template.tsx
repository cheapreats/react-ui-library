import React, { useState } from 'react';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

export interface TemplateProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string,
    headerSpacingStyle?: string,
    onDragEnd: () => void
};

const TemplatePrefills = {
    BUSINESS_INFORMATION: {
        title: 'Business Information',
        labels: ['Upload Logo Image', "Nasir's Gourmet Hot Dogs", "7818 Edgewater Lane\n St. Martins, NB E5R 4K3t", '615-555-0190', 'www.NasirsHotDogs.com'],
        display: 'center'
    },
    ORDER_DETAILS: {
        title: 'Order Details',
        labels: ['Time'],
        display: 'space-between'
    }
};

export const Template: React.FC<TemplateProps> = ({
    onDragEnd,
    ...props
}): React.ReactElement => {

    const templatePrefillTitles = Object.values(TemplatePrefills).map(templatePrefill => {
        return templatePrefill.title;
    });

    const templatePrefillLabels = Object.values(TemplatePrefills).map(templatePrefill => {
        return templatePrefill.labels;
    });

    const templatePrefillDisplays = Object.values(TemplatePrefills).map(templatePrefill => {
        return templatePrefill.display;
    });

    return (
        <Wrapper {...props}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                {Object.values(TemplatePrefills).map((TemplatePrefill, index) => (
                    <>
                        <Header>
                            {templatePrefillTitles[index]}
                        </Header>
                        <DroppableElement
                            droppableLabels={templatePrefillLabels[index]}
                            styling={templatePrefillDisplays[index]}
                        />
                    </>
                ))}
            </DragDropContext>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 364px;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    border: dotted 0.5px #4a4a4a;
    background-color: #ffffff;
    margin: 3vh 0;
`;
const Header = styled.div`
    margin: 5px 0 0 5px;
`;