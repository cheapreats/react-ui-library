import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Modal, modal, Global } from '../components/preview';
import { Button } from '../components';

const Stage = styled.div`
    min-height: 100vh;
    min-width: 100vw;
`;

const render = () => (
    <Button onClick={() => modal('rest').show({
        render: () => <h1>It's all ogre now</h1>
    })}>And Another one!</Button>
)

storiesOf('Modal', module)
    .addDecorator(story => <Global><Stage>{ story() }</Stage></Global>)
    .add('with text', () => (
        <div>
            <Button onClick={() => modal('test').show({
                render
            })}>Create modal</Button>
            <Modal/>
        </div>
    ))
;