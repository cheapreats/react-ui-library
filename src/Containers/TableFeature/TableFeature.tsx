import React from 'react'
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles'; 
import { Paragraph } from '@Text/Paragraph'; 

const Wrapper = styled.div`
    display: block;
    width: 80%;
    margin: 5rem auto;
`;
const HeaderWrapper = styled.div` 
    display: flex; 
    flex-direction: column;
`;
const ContentWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;
const Desciption = styled.div`
    flex: 0 auto;   
    width: 20%;
    padding-top: 1.5rem;
    padding-right: .5rem;
    @media screen and (max-width:600px) {
        .container {
            flex-basis: 100%;
            order: 2;
        }
    }
`;
const Table = styled.div`
    flex: 1;  
    @media screen and (max-width:600px) {
        .container {
            flex-basis: 100%;
            order: 1;
        }
    }
`;
const Heading = styled.div`
    font-weight: 600;
    margin-bottom: .1rem;
`;
const HeadingOne = styled.div`
    color: #00c4c4;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;
const HeadingTwo = styled.div` 
    color: #0a2540;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: "sohne-var","Helvetica Neue","Arial",sans-serif;
    margin-bottom: 2rem;
`;

export interface TableFeatureProps extends MainInterface, ResponsiveInterface {
    headingOne: string;
    headingTwo: string;
    title: string;
    paragh: string;
    ChildElement?: React.ReactElement; 
}

export const TableFeature: React.FC<TableFeatureProps> = ({
    headingOne,
    headingTwo,
    title,
    paragh,
    ChildElement, 
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
            <Table>
                {ChildElement}
            </Table>
        </ContentWrapper> 
    </Wrapper>
);