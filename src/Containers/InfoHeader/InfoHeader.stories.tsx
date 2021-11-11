import React from 'react';
import { Meta, Story } from '@storybook/react';
import { InfoHeader,InfoHeaderProps} from '../../index';
import { createStoryTitle} from '../../Constants';

export default {
    title: createStoryTitle('InfoHeader'),
    component: InfoHeader,
    args: {
        Text: 'Reach', 
    },
} as Meta;

export const Basic: Story<InfoHeaderProps> = (args) => (
    <InfoHeader {...args}/>
);