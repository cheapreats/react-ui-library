import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LimitedTimeBanner,LimitedTimeBannerProps} from '../../index';
import { Tag, TagProps } from '../../index';
import { createStoryTitle} from '../../Constants';

export default {
    title: createStoryTitle('LimitedTimeBanner'),
    component: LimitedTimeBanner,
    args: {
        minsRemaining: 120, 
    },
} as Meta;

export const Basic: Story<LimitedTimeBannerProps> = (args) => (
    <LimitedTimeBanner {...args}/>
);