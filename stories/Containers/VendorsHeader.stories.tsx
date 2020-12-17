import React from 'react';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { VendorsHeader, IVendorsHeaderProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Header'),
    component: VendorsHeader,
} as Meta;

const getVendorHeaderProps = () => ({
    headerText: 'Clients',
    rightButtonText: 'Add Client',
    leftButtonProps: {
        icon: Import,
        margin: '0 20px'
    },
    rightButtonProps: {
        icon: Add,
        primary: true
    }
});

const Template: Story<IVendorsHeaderProps> = (args) => (
    <VendorsHeader
        style={{ padding: '20px' }}
        {...args}
    />
);

export const Basic = Template.bind({});
Basic.args = getVendorHeaderProps();