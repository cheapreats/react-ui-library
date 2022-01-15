import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Coupon, CouponProps } from '../../index';


export default {
    title: 'Components/Coupon',
    component: Coupon,
} as Meta;

const defaultArgs = {
    couponTitle: '-40%',
    couponDescription: 'Applies to off-season items',
    couponSubdescription: 'Edit',
    color: 'lightblue',
};

const Template: Story<CouponProps> = (args) => <Coupon {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};
