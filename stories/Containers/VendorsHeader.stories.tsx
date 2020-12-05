import React from 'react';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { VendorsHeader, VendorsHeaderProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Header'),
    component: VendorsHeader,
} as Meta;

export const defaultArgs = {
    headerName: 'Clients',
    buttonName: 'Add Client',
    leftButtonProps: {
        icon: Import,
        margin: '0 20px'
    },
    rightButtonProps: {
        icon: Add,
        primary: true
    }
};

const Template: Story<VendorsHeaderProps> = (args) => (
    <VendorsHeader
        style={{ padding: '20px' }}
        {...args}
    />
);

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs
};