import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LimitedTimeBanner,LimitedTimeBannerProps} from '../../index';


export default {
    title: 'Components/LimitedTimeBanner',
    component: LimitedTimeBanner,
    args: {
        minsRemaining: 120,
        bannerWidth: 300,
        bannerHeight: 40,
    },
} as Meta;

export const Basic: Story<LimitedTimeBannerProps> = (args) => (
    <LimitedTimeBanner {...args}/>
);