import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    RestaurantReviewCard,
    IRestaurantReviewCardProps,
} from './RestaurantReviewCard';

export default {
    title: 'Components/Other/RestaurantReview/RestaurantReviewCard',
    component: RestaurantReviewCard,
    args: {},
} as Meta;

export const Basic: Story<IRestaurantReviewCardProps> = (args) => (
    <RestaurantReviewCard {...args} />
);
