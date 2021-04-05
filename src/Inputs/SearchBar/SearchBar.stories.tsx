import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SearchBar, SearchBarProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Search Bar'),
    component: SearchBar,
    argTypes: {
        onChange: {
            action: {
                type: 'string',
            },
        },
        onInput: {
            action: {
                type: 'string',
            },
        },
    },
    args: {
        label: 'Search Bar',
        placeholder: 'placeholder',
    },
} as Meta;

export const Basic: Story<SearchBarProps> = (args) => (
    <SearchBar {...args}>
        <option value='a'>Admiral Baldrick</option>
        <option value='b'>Beadle</option>
        <option value='c'>Baldrick</option>
        <option value='d'>Lady Farrow</option>
        <option value='e'>Don Speekingleesh</option>
        <option value='f'>Lady Emma Hamilton</option>
        <option value='g'>Lady Elizabeth</option>
        <option value='h'>Jack Large</option>
        <option value='i'>Earl Farrow</option>
        <option value='j'>Captain Redbeard Rum</option>
    </SearchBar>
);
