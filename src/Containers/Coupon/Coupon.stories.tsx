import React from 'react';
import { Coupon, CouponProps } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Coupon'),
    component: Coupon,
} as Meta;

const defaultArgs = {
    couponTitle: '-40%',
    couponDescription: 'Applies to off-season items',
    couponSubdescription: 'Edit',
    color: 'lightblue',
};

const Template: Story<CouponProps> = (args) => <Coupon {...args}></Coupon>;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
