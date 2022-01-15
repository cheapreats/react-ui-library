import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    PartyInfoInput,
    IPartyInfoInput,
} from '@Containers/PartyInfoInput/PartyInfoInput';


export default {
    title: 'Components/PartyInfoInput',
    component: PartyInfoInput,
} as Meta;

const handleNextClick = () => {
    console.log('Next button has been clicked');
};

const handleBackButtonClick = () => {
    console.log('Back Button has been clicked.');
};

const Template: Story<IPartyInfoInput> = (args) => <PartyInfoInput {...args} />;

export const PartyInfoInputComponent = Template.bind({});

PartyInfoInputComponent.args = {
    onBackButtonClick: handleBackButtonClick,
    onNextClick: handleNextClick,
};
