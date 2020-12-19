import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { VerticalTimeline, VerticalTimelineProps } from '../../index';

export default {
    title: createStoryTitle('VerticalTimeline'),
    component: VerticalTimeline,
    args: {
        verticalSpacing: 15,
        widthLeftPanels: 100,
        widthRightPanels: 200,
        heightPanels: 60,
        timelineData: [
            {
                label: 'step 1',
                time: new Date().getTime(),
            },
            {
                label: 'step 2',
                time: new Date().getTime(),
            },
            {
                label: 'step 3',
                time: new Date().getTime(),
            },
            {
                label: 'step 4',
                time: new Date().getTime(),
            },
        ],
    },
} as Meta;

export const Basic: Story<VerticalTimelineProps> = (args) => <VerticalTimeline {...args} />;
