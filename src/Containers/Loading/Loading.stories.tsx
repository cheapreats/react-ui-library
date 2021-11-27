import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Loading, LoadingProps } from '../../index';
import {  getCaptionForLocale } from '../../Constants';

export default {
    title: 'Components/Loading',
    component: Loading,
    args: {
        loading: true,
        children: 'Boo!',
    },
} as Meta;

export const Basic: Story<LoadingProps> = (args) => (
    <Loading {...args}>{getCaptionForLocale(args.children as string)}</Loading>
);

export const Uploading = Basic.bind({});

Uploading.args = {
    ...Uploading.args,
    message: 'Uploading...',
};
