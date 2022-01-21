import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LimitedTimeBanner,LimitedTimeBannerProps} from '../../index';


export default {
    title: 'Components/LimitedTimeBanner',
    component: LimitedTimeBanner,
    args: {
        minsRemaining: 120, 
    },
} as Meta;

export const Basic: Story<LimitedTimeBannerProps> = (args) => (
    <LimitedTimeBanner {...args}/>
);