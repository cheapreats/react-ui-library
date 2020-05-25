import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Accordion } from '../../src';
import { Paragraph } from '../../src';

const defaultActiveStyle = () => `
    color: #ee2434;
    font-weight: bold;
`;

storiesOf('Accordion', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Accordion activeStyle={defaultActiveStyle}>
            <section header={'Accordion Header 1'}>
                <Paragraph>{'Accordion children 1'}.</Paragraph>
                <Paragraph>{'Accordion children 1'}.</Paragraph>
                <Paragraph>{'Accordion children 1'}.</Paragraph>
                <Paragraph>{'Accordion children 1'}.</Paragraph>
                <Paragraph>{'Accordion children 1'}.</Paragraph>
            </section>
            <section header={'Accordion Header 2'}>
                <Paragraph>{'Accordion children 2'}.</Paragraph>
                <Paragraph>{'Accordion children 2'}.</Paragraph>
                <Paragraph>{'Accordion children 2'}.</Paragraph>
                <Paragraph>{'Accordion children 2'}.</Paragraph>
                <Paragraph>{'Accordion children 2'}.</Paragraph>
            </section>
        </Accordion>
    ));
