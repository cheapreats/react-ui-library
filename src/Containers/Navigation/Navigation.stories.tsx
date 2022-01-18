import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AppleAlt } from '@styled-icons/fa-solid/AppleAlt';
import { Archive } from '@styled-icons/fa-solid/Archive';
import { Compass } from '@styled-icons/fa-solid/Compass';
import { Home } from '@styled-icons/fa-solid/Home';
import { action } from '@storybook/addon-actions';
import {
    Navigation,
    NavigationProps,
    NavigationFooter,
    NavigationItem,
    NavigationHeader,
    _NavigationItemProps,
} from '../../index';

import { logoWhite } from '../../assets';

export default {
    title: 'Components/Navigation',
    component: Navigation,
} as Meta;

const defaultArgs = {};

interface IPages {
    [name: string]: {
        component: React.LazyExoticComponent<React.ComponentType> | null;
        navProps: _NavigationItemProps;
    };
}

const pages: IPages = {
    Item1: {
        component: null,
        navProps: {
            icon: AppleAlt,
            isSelected: true,
            onClick: action('Item1 was clicked!')
        },
    },
    Item2: {
        component: null,
        navProps: {
            icon: Archive,
            onClick: action('Item2 was clicked!')
        },
    },
    Home: {
        component: null,
        navProps: {
            icon: Home,
            onClick: action('Home was clicked!')
        },
    },
};

const Template: Story<NavigationProps> = (args) => (
    <Navigation {...args}>
        {Object.entries(pages).map(([key, { navProps }]) => (
            <NavigationItem key={key} {...navProps}>
                {key}
            </NavigationItem>
        ))}
    </Navigation>
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
