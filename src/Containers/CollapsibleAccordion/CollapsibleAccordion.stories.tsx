import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CollapsibleAccordion, Paragraph } from '../../index';

import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CollapsibleAccordion'),
    component: CollapsibleAccordion,
} as Meta;

export const Basic: Story = (args) => (
    <CollapsibleAccordion {...args}>
        <section data-header="Purchases" data-purchaseDate="Nov 2020" data-purchaseCount="5">
            <Paragraph>Nov 12 2020 | Generic Gas Station   | $4.92</Paragraph>
            <Paragraph>Nov 09 2020  | Generic Grocery Store | $91.90</Paragraph>
            <Paragraph>Nov 07 2020  | Generic Resteraunt    | $41.23</Paragraph>
            <Paragraph>Nov 06 2020  | Generic Crafts Store  | $14.31</Paragraph>
            <Paragraph>Nov 06 2020  | Generic Book Store    | $20.10</Paragraph>
        </section>
        <section data-header="Purchases" data-purchaseDate="Oct 2020" data-purchaseCount="27">
            <Paragraph>Oct 12 2020 | Generic Gas Station   | $4.92</Paragraph>
            <Paragraph>Oct 09 2020  | Generic Grocery Store | $91.90</Paragraph>
            <Paragraph>Oct 07 2020  | Generic Resteraunt    | $41.23</Paragraph>
            <Paragraph>Oct 06 2020  | Generic Crafts Store  | $14.31</Paragraph>
            <Paragraph>Oct 06 2020  | Generic Book Store    | $20.10</Paragraph>
        </section>
    </CollapsibleAccordion>
);
