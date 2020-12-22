import React from 'react';
import { Cog } from '@styled-icons/fa-solid/Cog';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import {
    List,
    ListProps,
    ListHeader,
    ListFooter,
    ListItem,
    ListToggle,
} from '../../index';
import { createStoryTitle } from '../../Constants';

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
        isOpen: {
            control: {
                type: 'boolean',
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
        columnWidth: '240px',
        loading: false,
        cssPosition: 'absolute',
        margin: '0',
        left: '0',
        right: 'auto',
        onCloseTranslateXAxis: '-100%',
        id: '1',
    },
} as Meta;

export const Basic: Story<ListProps> = (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    const setIsOpen = () => updateArgs({ isOpen: !isOpen });
    return (
        <List
            {...args}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toggleComponent={(
                <ListToggle
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isLeftToggle
                    isToggleHiddenDesktop
                />
            )}
        >
            {items.map((item) => (
                <ListItem
                    onClick={() => alert(`You clicked ${item.date}`)}
                    setIsOpen={setIsOpen}
                    isSelected={item.key === '2'}
                >
                    <p>{item.date}</p>
                </ListItem>
            ))}
        </List>
    );
};
