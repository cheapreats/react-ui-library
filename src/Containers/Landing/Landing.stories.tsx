import React from 'react';
import styled from 'styled-components';
import { Landing, ILandingProps } from '@Containers';
import { Button, Input } from '@Inputs';
import { Mixins } from '@Utils';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Landing'),
    component: Landing,
    argTypes: {
        label: {
            defaultValue: 'CheaprEats Landing',
            control: {
                type: 'text',
            },
        },
        description: {
            defaultValue: 'Please login with your Vendor employee account',
            control: {
                type: 'text',
            },
        },
        version: {
            defaultValue: '1',
            control: {
                type: 'text',
            },
        },
    },
    args: {
        logo: 'https://scontent.fphx1-1.fna.fbcdn.net/v/t1.0-9/29432778_207936176627967_6515661452525090864_n.png?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=OkWX6CgivlkAX_0WjVR&_nc_ht=scontent.fphx1-1.fna&oh=ecd9d09cbba70ad21634fc51b0a3a608&oe=5FC97964',
    },
} as Meta;

export const Basic: Story<ILandingProps> = (args) => (
    <Landing {...args}>
        <Input
            id="username-input"
            label="Username"
            description="The username of your employee account"
            placeholder="Username"
            margin="5px 0 0"
            name="username"
        />
        <Input
            id="password-input"
            label="Password"
            description="The password of your employee account"
            placeholder="Password"
            margin="10px 0 0"
            type="password"
            name="password"
        />
        <Controls>
            <Button id="login-button" margin="5px" primary>
                Login
            </Button>
            <Button margin="5px">Back</Button>
        </Controls>
    </Landing>
);

const Controls = styled.div`
    ${Mixins.flex()}
    ${Mixins.media(
        'tablet',
        `
        flex-direction: column;
        align-items: stretch;
    `,
    )}
    margin: 5px -5px -5px;
`;
