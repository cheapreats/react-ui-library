import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Heading, Paragraph } from '../../index';
import { media } from '../../Utils/Mixins';
import { Table } from './Table';

export interface TableFeatureProps extends MainInterface, ResponsiveInterface {
    heading: string;
    subHeading: string;
    title: string;
    description: string;
    rowsVisible?: number;
    traditional: string;
    stripe: string;
    data: {
        reportName: string;
        reportManual: string;
        reportAuto: string;
    }[];
}

export const TableFeature: React.FC<TableFeatureProps> = ({
    heading,
    subHeading,
    title,
    description,
    traditional,
    stripe,
    data,
}): React.ReactElement => (
    <Wrapper>
        <Heading color="primary" type="h5" bold>
            {heading}
        </Heading>
        <IHeading type="h1" bold>
            {subHeading}
        </IHeading>
        <Content>
            <Desciption>
                <Heading type="h6" bold>
                    {title}
                </Heading>
                <Paragraph>{description}</Paragraph>
            </Desciption>
            <TableHolder>
                <Table traditional={traditional} stripe={stripe} data={data} />
            </TableHolder>
        </Content>
    </Wrapper>
);

/** styled */
const Wrapper = styled.div`
    padding: 2rem;
    ${media('phone', 'padding: 0;')}
`;
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    ${media('phone', 'flex-direction: column-reverse')}
`;
const IHeading = styled(Heading)`
    line-height: 1;
    margin-bottom: 1rem;
`;
const Desciption = styled.div`
    width: 25%;
    display: block;
    padding: 1.5rem 1rem 0 0;
    ${media('phone', 'padding: 0; width: 100%')}
`;
const TableHolder = styled.div`
    width: 100%;
    display: block;
    padding-left: 1rem;
    ${media('phone', 'padding: 0px; margin: 0 0 1rem 0;')}
`;
