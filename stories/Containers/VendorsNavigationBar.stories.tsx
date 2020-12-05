import React from 'react';
import { TableView } from '@styled-icons/material/TableView';
import { List } from '@styled-icons/bootstrap/List';
import { ViewGrid } from '@styled-icons/heroicons-solid/ViewGrid';
import { NavigationBar, INavigationBarProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Navigation Bar'),
    component: NavigationBar,
} as Meta;

const getVendorNavigationBarProps = () => ({
    navigationBarItems: [
        {
            icon: TableView,
            label: 'Overview'
        },
        {
            icon: List,
            label: 'List View'
        },
        {
            icon: ViewGrid,
            label: 'Segment'
        }
    ],
    navigationItemProps: {
        style: {
            margin: '0 20px',
            paddingBottom: '5px'
        },
        iconProps: {
            style: {
                paddingRight: '5px'
            }
        }
    },
});

const Template: Story<INavigationBarProps> = (args) => (
    <NavigationBar {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorNavigationBarProps();