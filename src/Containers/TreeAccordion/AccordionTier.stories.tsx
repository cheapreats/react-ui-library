import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AccordionTier, IAccordionTierProps, Paragraph } from '../../index';
import { createStoryTitle } from '../../Constants'; 

export default {
    title: createStoryTitle('Accordion Tier'),
    component: AccordionTier,
    args: {
        header: "Accordion Header"
    }
} as Meta;

export const Basic: Story<IAccordionTierProps> = (args) => (
    <AccordionTier {...args}>
        <Paragraph>Child 1</Paragraph>
        <Paragraph>Child 2</Paragraph>
        <Paragraph>Child 3</Paragraph>
        <Paragraph>Child 4</Paragraph>
        <Paragraph>Child 5</Paragraph>
    </AccordionTier>
);