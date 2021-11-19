import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DraggableRow, DraggableRowProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Draggable Row'),
    component: DraggableRow,
    args: {
        templatePrefills: {
            TEMPLATE_ITEM: {
                caption: 'This is a template caption.'
            },
            TEMPLATE_ITEM2: {
                caption: 'This is another template caption.'
            },
        },
    },
} as Meta;

export const Basic: Story<DraggableRowProps> = (args) => (
    <DraggableRow {...args} />
);