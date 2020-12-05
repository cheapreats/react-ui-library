import React from 'react';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { VendorsHeader, VendorsHeaderProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Header'),
    component: VendorsHeader,
    argTypes: { onImportButtonClick: { action: 'I have been clicked!' } },
    args: {
        headerName: 'Clients',
        buttonName: 'Add Client',
        icon: Import,
        buttonIcon: Add,
        rowStyle: {
            display: 'flex',
            flexDirection: 'row',
        },
        buttonStyle: {
            margin: '0 20px'
        }
    },
} as Meta;

export const Basic: Story<VendorsHeaderProps> = (args) => (
    <VendorsHeader
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px',
        }}
        {...args}
    />
);