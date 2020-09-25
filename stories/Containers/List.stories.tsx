import React from 'react';
import { Cog } from '@styled-icons/fa-solid/Cog';
import {
    List,
    ListProps,
    ListHeader,
    ListFooter,
    ListItem,
    SideBarCollapseType,
} from '../../src';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

const COG_WHEEL_ICON = Cog;

const items = [
    { key: '1', data: 'data', date: 'today' },
    { key: '2', data: 'data', date: 'yesterday' },
    { key: '3', data: 'data', date: 'today' },
    { key: '4', data: 'data', date: 'yesterday' },
    { key: '5', data: 'data', date: 'today' },
    { key: '7', data: 'data', date: 'yesterday' },
    { key: '8', data: 'data', date: 'today' },
    { key: '9', data: 'data', date: 'yesterday' },
    { key: '10', data: 'data', date: 'today' },
    { key: '11', data: 'data', date: 'yesterday' },
    { key: '12', data: 'data', date: 'today' },
];

export default {
    title: createStoryTitle('List'),
    component: List,
    argTypes: {
        direction: {
            control: {
                type: 'radio',
                options: SideBarCollapseType,
            },
        },
    },
    args: {
        header: (
            <ListHeader
                label="List Header"
                headerFlex="space-between"
                icon={COG_WHEEL_ICON}
                iconProps="width: 20px; margin-right: 10px"
                iconClick={() => alert('Icon Clicked')}
            />
        ),
        footer: (
            <ListFooter>
                <p>This is a list Footer</p>
            </ListFooter>
        ),
        loading: false,
        direction: SideBarCollapseType.LEFT,
        isToggleable: false,
        id: '1',
    },
} as Meta;

export const Basic: Story<ListProps> = (args) => (
    <List {...args}>
        {items.map((item, index) => (
            <ListItem onClick={() => alert(`You clicked ${item.date}`)}>
                <p>{item.date}</p>
            </ListItem>
        ))}
    </List>
);
