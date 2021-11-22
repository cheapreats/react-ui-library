import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { ShowLogos, ILogoProps } from './Logo';

export default {
    title: createStoryTitle('Logo Listing'),
    component: ShowLogos,
} as Meta;

const defaultArgs = {
    listingTitle: 'Send payouts around the world',
    listingDescription:
        'Connect’s smart payout engine enables you to send money quickly—even instantly—to sellers, freelancers, or service providers around the world.',
    buttonText: 'Connect payouts >',
    logoA: {
        url: 'https://passiveincomemd.com/wp-content/uploads/2018/12/cozy-logo-orange-1024x341.png',
        width: '80px',
        title: 'cozy logo',
    },
    logoB: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Cargomatic_%28Company%29_Logo.png',
        width: '150px',
        title: 'cargomatic logo',
    },
    logoC: {
        url: 'https://lever-client-logos.s3.amazonaws.com/1896f2f7-640c-44b0-bd47-47d25ac5c003-1580424543682.png',
        width: '55px',
        title: 'lyra logo',
    },
    logoD: {
        url: 'https://www.pngkin.com/mnp/18-182989.png',
        width: '85px',
        title: 'clover logo',
    },
    logoE: {
        url: 'https://wpengine.com/wp-content/uploads/2020/01/bluestate_logo_2-color_rgb1.png',
        width: '200px',
        title: 'bluestate logo',
    },
};

export const Basic: Story<ILogoProps> = (args) => <ShowLogos {...args} />;
Basic.args = { ...defaultArgs };
