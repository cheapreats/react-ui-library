import React from 'react'
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles'; 
import { Paragraph } from '@Text/Paragraph'; 
import { media } from '../../Utils/Mixins'; 
import { TableOnly } from './TableOnly';

const Wrapper = styled.div`
    display: block;
    width: 80%;
    margin: 5rem auto;
    ${media('phone', 'margin: 5px; width:100%;')} 
`;
const HeaderWrapper = styled.div` 
    display: flex; 
    flex-direction: column;
`;
const Heading = styled.div`
    font-weight: 600;
    margin-bottom: 1rem;
`;
const HeadingOne = styled.div`
    color: #00c4c4;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;
const HeadingTwo = styled.div` 
    color: #0a2540;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: "sohne-var","Helvetica Neue","Arial",sans-serif;
    margin-bottom: 2rem;
    ${media('phone', 'font-size: 1.2rem; margin-bottom: 1rem;')} 
`;
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    ${media('phone', 'flex-direction: column-reverse')}
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

interface WorkflowProps { 
    colOne: string; 
    colTwo: string; 
    colThree: string;
}
interface ItemProps { 
    colOne: string; 
    colTwo: string; 
    colThree: string; 
}

export interface TableFeatureProps extends MainInterface, ResponsiveInterface {
    headingOne: string;
    headingTwo: string;
    title: string;
    paragh: string;
    /** dummy */
    data: WorkflowProps[] | ItemProps[];
    rowsVisible?: number; 
    headingColOne: string;
    headingColTwo: string;
    /** end */
}

export const TableFeature: React.FC<TableFeatureProps> = ({
    headingOne,
    headingTwo,
    title,
    paragh,
    /** dummy */
    data, 
    headingColOne,
    headingColTwo,
    /** end */
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <HeaderWrapper>
            <HeadingOne>{headingOne}</HeadingOne>
            <HeadingTwo>{headingTwo}</HeadingTwo>
        </HeaderWrapper>
        <ContentWrapper>
            <Desciption>
                <Heading>{title}</Heading>
                <Paragraph>{paragh}</Paragraph> 
            </Desciption>
            <TableHolder>
                <TableOnly 
                    headingColOne={headingColOne} 
                    headingColTwo={headingColTwo} 
                    data={data}
                />
            </TableHolder>         
        </ContentWrapper> 
    </Wrapper>
);