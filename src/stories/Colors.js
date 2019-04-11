import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Heading, Paragraph, Card as C, Row, Column, SmallText, ActiveText } from '../components';
import { Page, Section } from './components/Page';

const Color = styled.div`
    background-color: ${ ({ color }) => color };
    width: 100%;
    height: 93px;
`;

const CopyText = styled.input`
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    color: inherit;
    font-size: 0.9rem;
    font-weight: inherit;
    outline: none;
    cursor: pointer;
`;

const Card = styled(C)`
    max-width: 300px;
`;

const Title = styled(Heading)`
    font-size: 1rem;
`;

const Small = styled(SmallText)`
    font-size: 0.72rem;
`;

const Label = ({ label, value }) => (
    <Column col='6'>
        <Small margin='0 0 -5px' bold>{ label }</Small>
        <Paragraph margin='0' bold>
            <CopyText
                onClick={({ target }) => {
                    target.select();
                    document.execCommand('copy');
                    target.value = 'Copied!';
                    window.setTimeout(
                        () => target.value = value,
                        500
                    );
                }}
                readOnly
                value={ value }
            />
        </Paragraph>
    </Column>
)

const ColorCard = ({ color }) => {
    return (
        <Card margin='0 10px 10px 0' padding='0' radius='12px'>
            <Row>
                <Color label='Primary Color' color={ color }/>
                <div>
                    <Title type='h3' bold margin='10px 15px 5px'>Primary Color</Title>
                    <Row wrap padding='0 15px 10px'>
                        <Label label='HEX' value={ color }/>
                        <Label label='RGB' value='237,36,42'/>
                    </Row>
                </div>
            </Row>
        </Card>
    )
}

storiesOf('Colors', module)
    .add('Primary', () => (
        <Page>
            <Heading type='h2' margin='10px 0 -5px' bold>Primary Pallette</Heading>
            <ActiveText margin='0 0 20px' bold>
                <Paragraph margin='0' bold>
                    Colors to represent and support CheaprEats branding. Use generously as highlights and theming
                </Paragraph>
            </ActiveText>
            <Row wrap>
                <ColorCard color='#ED242A'/>
            </Row>
        </Page>
    ), {
        notes: ``
    });