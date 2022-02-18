import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MainContainer, IMainContainer } from './MainContainer';


export default {
    title: 'Components/TableManagement/MainContainer',
    component: MainContainer,
} as Meta;

const Template: Story<IMainContainer> = (args) => <MainContainer {...args} />;

export const MainContainerComponent = Template.bind({});
