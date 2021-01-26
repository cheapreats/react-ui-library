import React from 'react';
import { Meta, Story } from '@storybook/react';
import SignUpPopup, {ISignUpPopupProps}  from './SignUpPopup';
import { createStoryTitle } from '../../Constants';

const handleSubmit = (event: any, data: any) => {
    event.preventDefault();
    alert(data);
};


export default {
    title: createStoryTitle('Sign up Pop up'),
    component: SignUpPopup,
    args: {
        heading: "Special Offer - Get 1 month free",
        subHeading: "Increase your website conversion by 999% by adding this thingy thang",
        inputPlaceholder: "your@email.com",
        handleSubmit
    }
} as Meta;

export const Basic: Story<ISignUpPopupProps> = (args) => (
    <SignUpPopup {...args} />
);
