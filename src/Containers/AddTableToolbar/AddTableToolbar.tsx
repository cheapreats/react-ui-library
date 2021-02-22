import React from 'react';
import Button from '@storybook/react/dist/demo/Button';
import styled from 'styled-components';

export interface IAddTableToolbar {}

/**
 * Primary UI component for user interaction
 */
export const AddTableToolbar: React.FC<IAddTableToolbar> = () => (
    <BorderBox>
        <Container>
            <Row>Add New Table</Row>
            <Row>
                <Col>
                    <Center>
                        <Button>Table 1</Button>
                    </Center>

                </Col>
                <Col>
                    <Center>
                        <Button>Table 2</Button>
                    </Center>
                </Col>
                <Col>
                    <Center>
                        <Button>Table 3</Button>
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
    height: 11em;
    width: 40em;
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
  margin-top: 25%;
  text-align: center;
`;


