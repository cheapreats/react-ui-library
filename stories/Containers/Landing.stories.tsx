import React from 'react';
import styled from 'styled-components';
import { Landing, ILandingProps } from '../../src/Containers';
import { Button, Input } from '../../src/Inputs';
import { Mixins } from '../../src/Utils';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

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
        logo:
            'https://api.media.atlassian.com/file/3e6b2c46-c5e2-48ca-a544-140708b30636/binary?token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYTI1MzQ4Yi04ZWZiLTQzNTMtOTEyYi1iMWUxODJlMzQ2ZmQiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpmaWxlOjNlNmIyYzQ2LWM1ZTItNDhjYS1hNTQ0LTE0MDcwOGIzMDYzNiI6WyJyZWFkIl19LCJleHAiOjE2MDQ2MDQ2NjMsIm5iZiI6MTYwNDUyMTY4M30.W4jtGaEbKXYUA0A8o13vmXbn8vbPg0QCMC4Kbz01_LU&client=ea25348b-8efb-4353-912b-b1e182e346fd&name=logo-red.png',
    },
} as Meta;

export const Basic: Story<ILandingProps> = (args) => {
    return (
        <Landing {...args}>
            <Input
                id="username-input"
                label={'Username'}
                description={'The username of your employee account'}
                placeholder={'Username'}
                margin="5px 0 0"
                name="username"
            />
            <Input
                id="password-input"
                label={'Password'}
                description={'The password of your employee account'}
                placeholder={'Password'}
                margin="10px 0 0"
                type="password"
                name="password"
            />
            <Controls>
                <Button id="login-button" margin="5px" primary>
                    {'Login'}
                </Button>
                <Button margin="5px">{'Back'}</Button>
            </Controls>
        </Landing>
    );
};

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
