import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RatingBar, IRatingBarProps } from './RatingBar';

export default {
    title: 'Components/Other/RestaurantReview/RatingBar',
    component: RatingBar,
    args: {},
} as Meta;

export const Basic: Story<IRatingBarProps> = (args) => <RatingBar {...args} />;

export const WithRating = Basic.bind({});
WithRating.args = {
    ...Basic.args,
    rating: 0.5,
};
