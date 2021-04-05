import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { SearchBarExpandable, SearchBarExpandableProps } from '..';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Search Bar Expandable'),
    component: SearchBarExpandable,
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
        placeholder: 'placeholder',
        mediaQuery: 'tablet',
        mediaWidth: '300px',
    },
} as Meta;

export const Basic: Story<SearchBarExpandableProps> = (args) => {
    const stateExpanded = useState(false);
    return <SearchBarExpandable {...args} state={stateExpanded} />;
};
