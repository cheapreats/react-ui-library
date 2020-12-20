import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { VerticalTimeline, VerticalTimelineProps } from '../../index';
import { hoursMinutesToMilliseconds } from '../../Utils';

export default {
    title: createStoryTitle('VerticalTimeline'),
    component: VerticalTimeline,
    args: {
        verticalSpacing: 15,
        widthLeftPanels: 100,
        widthRightPanels: 200,
        heightPanels: 60,
        redColor: 'red',
        greenColor: 'green',
        locale: 'en-US',
        timelineData: [
            {
                label: 'start preparation',
                time: new Date('2020-12-19T15:00:00').getTime(),
                maxTime: hoursMinutesToMilliseconds(1, 0),
            },
            {
                label: 'prepared',
                time: new Date('2020-12-19T15:30:00').getTime(),
                maxTime: hoursMinutesToMilliseconds(0, 15),
            },
            {
                label: 'start delivering',
                time: new Date('2020-12-19T16:00:00').getTime(),
                maxTime: hoursMinutesToMilliseconds(0, 30),
            },
            {
                label: 'delivered',
                time: new Date('2020-12-19T16:45:00').getTime(),
                maxTime: 0,
            },
        ],
    },
} as Meta;

export const Basic: Story<VerticalTimelineProps> = (args) => (
    <VerticalTimeline {...args} />
);
