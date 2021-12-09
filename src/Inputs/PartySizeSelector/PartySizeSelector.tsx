import React, { useState } from 'react';
import styled from 'styled-components';
import {Person} from '@styled-icons/bootstrap/Person'
import {PersonFill} from '@styled-icons/bootstrap/PersonFill'
import { Mixins } from '../../Utils';

export interface IPartySizeSelector extends React.HTMLAttributes<HTMLDivElement>{
    clientIndexes: Array<number>;
    partyName: string,
    onPersonClick: (index: number) => void,
    person?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    personFill?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}


export const PartySizeSelector: React.FC<IPartySizeSelector> = ({
    clientIndexes= [],
    partyName= "",
    onPersonClick,
    person = Person,
    personFill = PersonFill,
    ...props
}) => {

    const [partySize, setPartySize] = useState(0);

    /** changes icons that have a smaller index then selected */
    const getIcon = (clientIndex: number) =>{
        if(clientIndex > partySize) {
            return (
                <Icon as={person}/>
            );
        }
        return (
            <Icon as={personFill}/>
        );
        
    }
    const onPersonClickFinal = (clientIndex: number) => {
        setPartySize(clientIndex);
        onPersonClick(clientIndex);
    }

    /** makes the columns of icons */
    const cols = clientIndexes.map((clientIndex) =>
        <Col key={clientIndex.toString()}>
            <IconButton onClick={() => onPersonClickFinal(clientIndex)}>

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
  ${Mixins.scroll}
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  /*overflow-x: scroll;
  overflow-y: hidden;*/
`;

const Icon = styled.svg`
  fill: ${({theme}) => theme.colors.statusColors.orange};
  width: 35px;
`;

const IconButton = styled.button`
  background-color: ${({theme}) => theme.colors.background};
  border: none;
  
`;

const Title = styled.div`
  fill: ${({theme}) => theme.colors.text};
  padding-bottom: 3px;
  font-weight: bold;
  font-size: 1.3rem;
  margin-left: 13px;
`;

const Col = styled.div`
    margin-bottom: 6px;
`;

const Row = styled.div`
  display: inline-flex;
`;

const IndexNum = styled.div`
  fill: ${({theme}) => theme.colors.text};
  font-weight: bold;
  display: flex;
  justify-content: center;
`;





