import React from 'react';
import { Story, Meta } from '@storybook/react';
import { FeatureDisplay, IFeatureDisplayProps } from './FeatureDisplay';
import { createStoryTitle } from 'Constants';

export default {
    title: createStoryTitle('Feature Display'),
    component: FeatureDisplay,
} as Meta;

const defaultArgs = {
    featureTitle: 'Beat fraud',
    featureImage:
        'https://images.ctfassets.net/fzn2n1nzq965/fRQE4UVZ0tpsoLuF9lrCD/185234ce93e4fb867f278a306d0b3a2d/rule-performance-chart-graphic-chart.svg',
    featureImageTitle: 'Rule performance',
    highlightTexts: [
        'Device fingerprinting and proxy detection',
        'Custom rules and allow and block lists',
        'Dynamic 3D Secure',
        'Review queues and advanced fraud insights',
    ],
    featureFooter: 'Learn more about Stripe Radar >',
};
export const Basic: Story<IFeatureDisplayProps> = (args) => (
    <FeatureDisplay {...args}></FeatureDisplay>
);
Basic.args = { ...defaultArgs };
