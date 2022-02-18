import React from 'react';
import { TableView } from '@styled-icons/material/TableView';
import { List } from '@styled-icons/bootstrap/List';
import { ViewGrid } from '@styled-icons/heroicons-solid/ViewGrid';
import { Story, Meta } from '@storybook/react';
import { NavigationBar, INavigationBarProps } from './NavigationBar';


export default {
    title: 'Dashboard/CRM/Vendors Navigation Bar',
    component: NavigationBar,
} as Meta;

const getVendorNavigationBarProps = (): INavigationBarProps => ({
    navigationBarItems: [
        {
            icon: TableView,
            label: 'Overview',
        },
        {
            icon: List,
            label: 'List View',
        },
        {
            icon: ViewGrid,
            label: 'Segment',
        },
    ],
    navigationItemProps: {
        label: 'Icon',
        style: {
            margin: '0 20px',
            paddingBottom: '5px',
        },
        iconProps: {
            style: {
                paddingRight: '5px',
            },
        },
    },
});

const Template: Story<INavigationBarProps> = (args) => (
    <NavigationBar {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorNavigationBarProps();
