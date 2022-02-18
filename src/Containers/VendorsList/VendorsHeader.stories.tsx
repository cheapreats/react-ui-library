import React from 'react';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { Story, Meta } from '@storybook/react';
import { VendorsHeader, IVendorsHeaderProps } from '../../index';


export default {
    title: 'Dashboard/CRM/Vendors Header',
    component: VendorsHeader,
} as Meta;

const getVendorHeaderProps = () => ({
    headerText: 'Clients',
    rightButtonText: 'Add Client',
    leftButtonProps: {
        icon: Import,
        margin: '0 20px',
    },
    rightButtonProps: {
        icon: Add,
        primary: true,
    },
});

const Template: Story<IVendorsHeaderProps> = (args) => (
    <VendorsHeader style={{ padding: '20px' }} {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorHeaderProps();
