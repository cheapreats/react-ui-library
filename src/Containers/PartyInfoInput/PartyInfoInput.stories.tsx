import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    PartyInfoInput,
    IPartyInfoInput,
} from '@Containers/PartyInfoInput/PartyInfoInput';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('PartyInfoInput'),
    component: PartyInfoInput,
} as Meta;

const handleMinusClick = () => {
    console.log('Minus Button has been clicked.');
};

const handlePlusClick = () => {
    console.log('Plus button has been clicked');
};

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
    onMinusClick: handleMinusClick,
    onPlusClick: handlePlusClick,
    onNextClick: handleNextClick,
};
