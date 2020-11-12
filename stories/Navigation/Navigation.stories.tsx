import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AppleAlt } from '@styled-icons/fa-solid/AppleAlt';
import { Archive } from '@styled-icons/fa-solid/Archive';
import { BrowserRouter } from 'react-router-dom';
import { Navigation, NavigationProps, NavigationFooter } from '../../src';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Navigation'),
    component: Navigation,
} as Meta;

const Header = () => <div>hello</div>;

const defaultArgs = {
    label: 'Some Text', // this is for NavigationHeader
    footer: <NavigationFooter url="#foo" text="Link to" />,
    header: <Header />,
};

const Template: Story<NavigationProps> = (args) => (
    <BrowserRouter>
        <Navigation {...args} />
    </BrowserRouter>
);

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};

export const WithPages = Template.bind({});

WithPages.args = {
    ...defaultArgs,
    pages: {
        Item1: {
            navProps: {
                to: '/:id/orders',
                icon: AppleAlt,
            },
        },
        Item2: {
            navProps: {
                to: '/:id/orders',
                icon: Archive,
            },
        },
    },
};
