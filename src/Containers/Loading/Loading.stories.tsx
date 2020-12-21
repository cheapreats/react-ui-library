import React from 'react';
import { Loading, LoadingProps } from '../../index';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Loading'),
    component: Loading,
    args: {
        loading: true,
        children: 'Boo!',
    },
} as Meta;

export const Basic: Story<LoadingProps> = (args) => (
    <Loading {...args}>{getCaptionForLocale(args.children)}</Loading>
);
