import React from 'react';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TemplateProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    selectedOption?: string,
    onDragEnd: () => void
};

const TemplatePrefills = {
    BUSINESS_INFORMATION: {
        title: 'Business Information',
        labels: [['Upload Logo Image'], ["Nasir's Gourmet Hot Dogs"], ['7818 Edgewater Lane', 'St. Martins, NB E5R 4K3t'], ['615-555-0190'], ['www.NasirsHotDogs.com']],
        display: 'center',
        column: true,
    },
    ORDER_DETAILS: {
        title: 'Order Details',
        labels: [['Time: 3:23pm', 'Date: 01/23/21'], ['Order transaction #', '3249244'], ['Station #', '34'], ['Status', 'Dine Out'], ['Sales Associate', 'Cassandra']],
        display: 'space-between',
        column: false,
    },
    MENU_ITEMS: {
        title: 'Menu Items',
        labels: [[]],
        display: '',
        column: false,
    },
    PRICE_AND_PAYMENT: {
        title: 'Price & Payment',
        labels: [['Total Price', '$13.99'], ['Rates of Sales Tax', '1.23%'], ['Amount of Tax', '$2.13'], ['Total Price with tax included', '$15.12'], ['Payment Method', '***********2143']],
        display: 'space-between',
        column: false
    },
    CODE: {
        title: 'Code',
        labels: [[]],
        display: '',
        column: false
    },
    SIGNATURE: {
        title: 'Signature',
        labels: [[]],
        display: '',
        column: false
    }
};

export const Template: React.FC<TemplateProps> = ({
    onDragEnd,
    selectedOption,
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

    const templatePrefillColumn = Object.values(TemplatePrefills).map(templatePrefill => {
        return templatePrefill.column;
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
                            isColumn={templatePrefillColumn[index]}
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
    padding: auto;
`;
const Header = styled.div`
    margin: 5px 0 0 5px;
`;