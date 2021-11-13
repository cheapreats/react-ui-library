import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreatedDate, CreatedDateProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CreatedDate'),
    component: CreatedDate,
    args: {
        dateCreated: "June 29, 2007"
    }
} as Meta

export const Basic: Story<CreatedDateProps> = (args) => <CreatedDate {...args} />;