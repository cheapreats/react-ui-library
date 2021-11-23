import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactLogo } from '@styled-icons/boxicons-logos';
import { TreeAccordion, ITreeAccordionProps, Paragraph } from '../../index';
import { createStoryTitle } from '../../Constants'; 

export default {
    title: createStoryTitle('Tree Accordion'),
    component: TreeAccordion,
    args: {
        header: "Accordion Header",
        icon: ReactLogo,
        displayItemCount: true,
        style: {
            width: "15%"
        }
    }
} as Meta;

export const Basic: Story<ITreeAccordionProps> = (args) => (
    <TreeAccordion {...args}>
        <Paragraph >Child 1</Paragraph>
        <Paragraph >Child 2</Paragraph>
        <Paragraph>Child 3</Paragraph>
        <Paragraph>Child 4</Paragraph>
        <Paragraph>Child 5</Paragraph>
    </TreeAccordion>
);

export const RandomHeights: Story<ITreeAccordionProps> = (args) => (
    <TreeAccordion {...args} treeStrokeColor="red" >
        <Paragraph padding="20px 0">Child 1</Paragraph>
        <Paragraph lineHeight="100px">Child 2</Paragraph>
        <Paragraph margin="20px">Child 3</Paragraph>
        <Paragraph>Child 4</Paragraph>
        <Paragraph>Child 5</Paragraph>
    </TreeAccordion>
);

export const NoChildren: Story<ITreeAccordionProps> = (args) => (
    <TreeAccordion {...args} />
);