import React from 'react';
import styled from 'styled-components';
import {SquareTable,CircleTable} from '@Containers';


export interface IAddTableToolbar {
    /**
     * on click function for Square table
     */
    onSquareTableClick: () => void;
    /**
     * on click function for Circle table
     */
    onCircleTableClick: () => void;
    /**
     * on click function for Rectangle table
     */
    onRectTableClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const AddTableToolbar: React.FC<IAddTableToolbar> = ({
    onSquareTableClick, 
    onCircleTableClick,
    onRectTableClick,
    ...props
}) => (
    <BorderBox>
        <Container>
            <Title>Add New Table</Title>
            <Row>
                <Col>
                    <Center>
                        <TableButton onClick={onSquareTableClick}>
                            <SquareTable
                                tableShape={'Square'}
                                tableID="T1"
                                partyName=""
                                occupancyStatus="Vacant"
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                ]}
                                isSquare={false}
                                relativeSize={0.2}
                                tableUse="AddTableButton"
                            />
                        </TableButton>
                    </Center>
                </Col>
                <Col>
                    <Center>
                        <TableButton onClick={onCircleTableClick}>
                            <CircleTable
                                tableShape={'Circle'}
                                tableID="T2"
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.2,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.2,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Dean',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.2,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'top',
                                        isSeated: false,
                                        occupiedBy: '',
                                        isVisible: true,
                                        isRound: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                ]}
                                partyName=""
                                occupancyStatus="Vacant"
                                relativeSize={0.2}
                                tableUse="AddTableButton"
                            />
                        </TableButton>
                    </Center>
                </Col>
                <Col>
                    <Center>
                        <TableButton onClick={onRectTableClick}>
                            <SquareTable
                                tableShape={'Square'}
                                tableID="T1"
                                partyName=""
                                occupancyStatus="Vacant"
                                chairs={[
                                    {
                                        position: 'top',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'left',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'left',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'right',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'right',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                    {
                                        position: 'bottom',
                                        isSeated: true,
                                        occupiedBy: 'Scott',
                                        isVisible: true,
                                        relativeSize: 0.3,
                                        tableUse: 'TableForManagement',
                                    },
                                ]}
                                isSquare={false}
                                relativeSize={0.2}
                                tableUse="AddTableButton"
                            />
                        </TableButton>
                    </Center>
                </Col>
            </Row>
        </Container>
    </BorderBox>
);

/**
 * Styled component variables
 */
const Container = styled.div`
    width: 90%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`;

const BorderBox = styled.div`
    border: 0.1em solid black;
    border-radius: 1em;
    height: 210px;
    width: 523px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 15px;
  margin-left: 15px;
`;

const Col = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  outline: none;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-family: Quicksand, sans-serif;
`;

const TableButton = styled.button`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;
