import React from 'react';
import { Story, Meta } from '@storybook/react';
import { VendorsFilter, IVendorsFilterProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Vendors Filter'),
    component: VendorsFilter,
} as Meta;

const getVendorFilterProps = () => ({
    headingTitle: 'Filters',
    buttonText: 'Apply',
    style: {
        padding: '20px'
    },
    headingProps: {
        style: {
            padding: '20px 0 0 20px'
        }
    },
    buttonProps: {
        style: {
            margin: '20px 0'
        }
    },
    collapsibleHeadingProps: {
        style: {
            marginBottom: '20px'
        }
    },
    filterItems: [
        {
            title: 'Email',
            selectOptions: ['Contains', 'Equals'],
            placeholder: 'Add email'
        },
        {
            title: 'First Name',
            selectOptions: ['Starts with', 'Equals'],
            placeholder: 'Add first name'
        },
        {
            title: 'Last Name',
            selectOptions: ['Starts with', 'Equals'],
            placeholder: 'Add last name'
        },
        {
            title: 'Tag',
            selectOptions: ['Contains', 'Equals'],
            placeholder: 'Add tag'
        },
        {
            title: 'Created',
            selectOptions: ['Created earlier than', 'Created on', 'Created later than'],
            placeholder: 'Select date'
        }
    ]
});

const Template: Story<IVendorsFilterProps> = (args) => (
    <VendorsFilter {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorFilterProps();
