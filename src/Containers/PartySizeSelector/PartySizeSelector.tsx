import React, { useState } from 'react';
import styled from 'styled-components';
import {Person} from '@styled-icons/bootstrap/Person'
import {PersonFill} from '@styled-icons/bootstrap/PersonFill'

export interface IPartySizeSelector extends React.HTMLAttributes<HTMLDivElement>{
    clientIndexes: Array<number>;
    partyName: string,
    person?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    personFill?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}


export const PartySizeSelector: React.FC<IPartySizeSelector> = ({
    clientIndexes= [],
    partyName= "",
    person = Person,
    personFill = PersonFill,
    ...props
}) => {

    const [partySize, setPartySize] = useState(0);

    /**changes icons that have a smaller index then selected*/
    const getIcon = (clientIndex: number) =>{
        if(clientIndex > partySize) {
            return (
                <Icon as={person}/>
            );
        }else {
            return (
                <Icon as={personFill}/>
            );
        }
    }

    /*makes the columns of icons*/
    const cols = clientIndexes.map((clientIndex) =>
            <Col key={clientIndex.toString()}>
                <IconButton onClick={() => setPartySize(clientIndex)}>

                    {getIcon(clientIndex)}
                </IconButton>
                <IndexNum>{clientIndex}</IndexNum>
            </Col>
    );

    return(
        <Content {...props}>
            <Title>{partyName}</Title>
            <Scrolling>
                <Row>
                    {cols}
                </Row>
            </Scrolling>
        </Content>
    )
};

const Content = styled.div`
`;

const Scrolling = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
`;

const Icon = styled.svg`
  fill: #f98300;
  width: 35px;
`;

const IconButton = styled.button`
  background-color: #ffffff;
  border: none;
`;

const Title = styled.div`
  fill: #4a4a4a;
  padding-bottom: 3px;
  font-weight: bold;
  font-size: 1.3rem;
  margin-left: 13px;
`;

const Col = styled.div`
`;

const Row = styled.div`
  display: inline-flex;
`;

const IndexNum = styled.div`
  fill: #4a4a4a;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;





