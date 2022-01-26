import React from 'react';
import { Story, Meta } from '@storybook/react';

import { FeatureDisplay, IFeatureDisplayProps } from './FeatureDisplay';

export default {
    title: 'Marketing Website/Feature Display',
    component: FeatureDisplay,
} as Meta;

const defaultArgs = {
    featureTitle: 'Beat fraud',
    featureSubTitle:
        'Stripe Radar uses sophisticated machine learning trained daily on data from millions of global businesses to protect you from fraudsters.',
    featureImage:
        'https://images.ctfassets.net/fzn2n1nzq965/fRQE4UVZ0tpsoLuF9lrCD/185234ce93e4fb867f278a306d0b3a2d/rule-performance-chart-graphic-chart.svg',
    imageTitle: 'Rule performance',
    imageTags: ['Blocked', 'Allowed', 'Secure auth', 'Manual review'],
    imageTagColors: ['RoyalBlue', 'LimeGreen', 'MediumPurple', 'LightSkyBlue'],
    highlightTexts: [
        'Device fingerprinting and proxy detection',
        'Custom rules and allow and block lists',
        'Dynamic 3D Secure',
        'Review queues and advanced fraud insights',
    ],
    featureFooter: 'Learn more about Stripe Radar',
};
export const Basic: Story<IFeatureDisplayProps> = (args) => (
    <FeatureDisplay {...args} />
);
Basic.args = { ...defaultArgs };
