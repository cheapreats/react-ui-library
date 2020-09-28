import React from 'react';
import { Coupon, CouponProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Coupon'),
    component: Coupon,
} as Meta;

const defaultArgs = {
    text1: '-40%',
    text2: 'Applies to off-season items',
    text3: 'Edit',
    bg: 'lightblue',
};

const Template: Story<CouponProps> = (args) => <Coupon {...args}></Coupon>;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
