import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LimitedTimeBanner, BannerProps, Paragraph,} from '../../index';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';


export default {
    title: createStoryTitle('LimitedTimeBanner'),
    component: LimitedTimeBanner,
    args: {
    },
} as Meta;

export const Basic: Story<BannerProps> = (args) => (
    <LimitedTimeBanner {...args}>
        <Paragraph bold>{getCaptionForLocale ('2 Hours Remaining')}</Paragraph>
    </LimitedTimeBanner>
);
