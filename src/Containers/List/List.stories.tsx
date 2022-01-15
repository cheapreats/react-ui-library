import React from 'react';
import { Cog } from '@styled-icons/fa-solid/Cog';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import {
    List,
    ListFooter,
    ListHeader,
    ListHeaderProps,
    ListItem,
    ListProps,
    ListToggle,
} from '../../index';


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
    title: 'Components/List',
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
                label="Header"
                headerFlex="space-between"
                icon={COG_WHEEL_ICON}
                iconProps="width: 20px; margin-right: 10px;"
                iconClick={() => alert('Icon Clicked')}
            />
        ),
        footer: (
            <ListFooter>
                <p>This is a list Footer</p>
            </ListFooter>
        ),
        columnWidth: '300px',
        loading: false,
        cssPosition: 'absolute',
        margin: '0',
        left: '0',
        right: 'auto',
        id: '1',
        mediaMixin: 'tablet',
        mediaCssPosition: 'absolute',
        mediaLeft: '0',
        mediaRight: 'auto',
        mediaMargin: 'auto',
        mediaOnCloseTranslateXAxis: '-100%',
    },
} as Meta;

export const ListHeaderWithSearchBar: Story<ListHeaderProps> = (args) => (
    <div style={{ width: '255px' }}>
        <ListHeader {...args} />
    </div>
);

ListHeaderWithSearchBar.args = {
    label: 'Header',
    headerFlex: 'space-between',
    icon: COG_WHEEL_ICON,
    iconProps: 'width: 20px; margin-left: 10px;',
    iconClick: () => alert('Icon Clicked'),
    onSearch: (value: string) => {
        console.log(value);
    },
    searchBarWidth: '125px',
    searchBarMediaQuery: 'phone',
    searchBarMediaWidth: '70vw ',
};

export const Basic: Story<ListProps> = (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    const setIsOpen = () => updateArgs({ isOpen: !isOpen });
    return (
        <List
            {...args}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toggleComponent={
                <ListToggle
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isLeftToggle
                    isToggleHiddenDesktop
                />
            }
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
