import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Accordion, AccordionProps, Paragraph } from '../../index';



const defaultActiveStyle = () => `
    color: #ee2434;
    font-weight: bold;
`;

export default {
    title: 'Components/Accordion/Accordion',
    component: Accordion,
} as Meta;

export const Basic: Story<AccordionProps> = (args) => (
    <Accordion {...args} activeStyle={defaultActiveStyle}>
        <section data-header="Accordion Header 1">
            <Paragraph>Accordion children 1 .</Paragraph>
            <Paragraph>Accordion children 1 .</Paragraph>
            <Paragraph>Accordion children 1 .</Paragraph>
            <Paragraph>Accordion children 1 .</Paragraph>
            <Paragraph>Accordion children 1 .</Paragraph>
        </section>

        <section data-header="Accordion Header 2">
            <Paragraph>Accordion children 2 .</Paragraph>
            <Paragraph>Accordion children 2 .</Paragraph>
            <Paragraph>Accordion children 2 .</Paragraph>
            <Paragraph>Accordion children 2 .</Paragraph>
            <Paragraph>Accordion children 2 .</Paragraph>
        </section>
    </Accordion>
);
