import React from 'react';
import { Meta, Story } from '@storybook/react';
import {MainTheme} from '@Themes/MainTheme';
import { RatingItem, IRatingItemProps } from './RatingItem';

export default {
    title: 'Components/Other/RestaurantReview/RatingItem',
    component: RatingItem,
    args: {
        stars:5,
        rating:0.41,
    },
} as Meta;

export const Basic: Story<IRatingItemProps> = (args) => <RatingItem {...args} />;
export const RedColor= Basic.bind({});
RedColor.args= {
    ...Basic.args,
    barColor:MainTheme.colors.statusColors.red,
}
