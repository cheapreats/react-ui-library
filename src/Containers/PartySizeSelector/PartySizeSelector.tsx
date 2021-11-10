import React, { useState } from 'react';
import styled from 'styled-components';
import {Person} from '@styled-icons/bootstrap/Person'
import {PersonFill} from '@styled-icons/bootstrap/PersonFill'

export interface IPartySizeSelector {
    person?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    personFill?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}



export const PartySizeSelector: React.FC<IPartySizeSelector> = ({
    person = Person,
    personFill = PersonFill,
    ...props
}) => {
    const [partySize, setIsFilled] = useState(0);

    const clientIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const getIcon = (clientIndex: number) =>{
        /*changes icons that have a smaller index then selected*/
        if(clientIndex > partySize) {
            return (
                <Icon as={person}/>
            );
        }else {
            return (
                <SecondIcon as={personFill}/>
            );
        }
    }

    const cols = clientIndexes.map((clientIndex) =>
            /* makes 10 columns*/
            <Col key={clientIndex.toString()}>
                <IconButton onClick={() => setIsFilled(clientIndex)}>

                    {getIcon(clientIndex)}
                </IconButton>
                <IndexNum>{clientIndex}</IndexNum>
            </Col>
    );

    return(
        <div {...props}>
            <Title>AMOUNT</Title>
            <Row>
                {cols}
            </Row>
        </div>
    )
};

const Icon = styled.svg`
    fill: #8c9c9c;
`;

const SecondIcon = styled.svg`
    fill: #dda859;
`;

const IconButton = styled.button`
  background-color: white;
  border: none;
  width: 100%;
  height: 5em;
`
const Title = styled.div`
  padding-left: 15px;
  fill: #8c9c9c;
  font-weight: bold;
`

const Col = styled.div`
  float: left;
  width: 7%;
`

const Row = styled.div`
  width: 100%;
  max-width: 800px;
`
const IndexNum = styled.div`
  width: 100%;
  margin-left: 24px;
  fill: #8c9c9c;
  font-weight: bold;
`





