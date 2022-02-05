import { BagFill, InfoCircleFill } from "@styled-icons/bootstrap";
import { HomepageTemplate, IHomepageProps } from './HomepageTemplate';
import { MainTheme } from "@Themes/MainTheme";
import { Meta, Story } from '@storybook/react';
import React from 'react';

const LOGO =
  "https://www.cheapreats.com/static/90939a6dc8dacea8e44d046c72521a1b/16c7d/logo.png";
const IMAGE =
  "https://images.unsplash.com/photo-1604573714289-312a6972f67c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

export default {
    title: 'Voice User Interface/Homepage/Homepage Template',
    component: HomepageTemplate,
    args: {
        parallaxProps: {
            blur: { min: -8, max: 8 },
            bgImage: IMAGE,
            strength: 300,
        },
        welcomeHeading: {
            type: 'h1',
            children: (
            <div>
                Welcome to the CheaprEats
                <br />
                Voice Ordering System
            </div>),
        },
        startOrderButtonProps: {
            icon: BagFill,
            primary: true,
            iconSize: '20px',
        },
        learnMoreButtonProps: {
            icon: InfoCircleFill,
            iconSize: '20px',
        },
        snowFallColor: MainTheme.colors.primary,
        logoSubSectionColor: MainTheme.colors.primary,
        logoURL: LOGO,
        howItWorksText: 'How it works',
        carouselDetails: {
            reviews: [
                { testimony: "Follow the instructions of the chat bot", reviewer: "" },
                { testimony: "Order with your voice or text", reviewer: "" },
                { testimony: "Scan the QR code to pay", reviewer: "" },
              ],
              isAutoplaying: true,
              carouselInterval: 5000,
              isLooping: true,
        },
    },
} as Meta;

export const Basic: Story<IHomepageProps> = (args) => (
    <HomepageTemplate {...args} />
);