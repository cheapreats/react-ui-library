import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AppleAlt } from '@styled-icons/fa-solid/AppleAlt';
import { Archive } from '@styled-icons/fa-solid/Archive';
import { BrowserRouter } from 'react-router-dom';
import { Compass } from '@styled-icons/fa-solid/Compass';
import {
    Navigation,
    NavigationProps,
    NavigationFooter,
    NavigationItem,
    NavigationHeader,
} from '../../src';
import { createStoryTitle } from '../Constants';
import { logoWhite } from '../assets';

export default {
    title: createStoryTitle('Navigation'),
    component: Navigation,
} as Meta;

const defaultArgs = {};

interface NavProps {
    to: string;
    label?: string;
    icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

interface IPages {
    [name: string]: {
        component: React.LazyExoticComponent<React.ComponentType>;
        navProps: NavProps;
    };
}

const pages: IPages = {
    Item1: {
        component: null,
        navProps: {
            to: '/:id/orders',
            icon: AppleAlt,
        },
    },
    Item2: {
        component: null,
        navProps: {
            to: '/:id/orders',
            icon: Archive,
        },
    },
};

const Template: Story<NavigationProps> = (args) => (
    <BrowserRouter>
        <Navigation {...args}>
            {Object.entries(pages).map(([key, { navProps }]) => (
                <NavigationItem key={key} {...navProps}>
                    {key}
                </NavigationItem>
            ))}
        </Navigation>
    </BrowserRouter>
);

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};

export const WithHeader = Template.bind({});

const headerLabel = 'Some Text';

WithHeader.args = {
    ...defaultArgs,
    header: <NavigationHeader label={headerLabel} />,
};

export const WithFooter = Template.bind({});

WithFooter.args = {
    ...defaultArgs,
    footer: <NavigationFooter url="#foo" text="Link to" icon={Compass} />,
};

const Header = () => <div>hello</div>;

export const WithSubHeader = Template.bind({});

WithSubHeader.args = {
    ...defaultArgs,
    subHeader: <Header />,
};

export const WithFooterHeaderSubheader = Template.bind({});

WithFooterHeaderSubheader.args = {
    ...defaultArgs,
    header: <NavigationHeader label={headerLabel} logo={logoWhite} />,
    footer: <NavigationFooter url="#foo" text="Link to" icon={Compass} />,
    subHeader: <Header />,
};
