import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Modal, Global } from '../components/preview';
import { Button, Paragraph } from '../components';

const Stage = styled.div`
    min-height: 100vh;
    min-width: 100vw;
`;

const Demo = () => {
    const showState = useState(false);
    const showAgain = useState(false);
    return (
        <Fragment>
            <Button onClick={() => showState[1](true)}>Create a Modal!</Button>
            <Modal state={ showState } base>
                <Paragraph bold>WEEEEEEE</Paragraph>
                <Button onClick={() => showAgain[1](true)}>And Another one!</Button>
            </Modal>
            <Modal state={ showAgain }>
                <Paragraph bold>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum dui vestibulum dolor porttitor ultrices. Integer a diam lacus. Mauris odio enim, pulvinar ut diam ut, lobortis consequat magna. Integer sit amet turpis nec purus bibendum rhoncus et quis massa. Aliquam erat volutpat. Mauris ultrices ligula a arcu condimentum ultrices. Maecenas ut tellus est. Nam sagittis leo non augue ultrices, sed cursus sapien pretium.
                </Paragraph>
                <Paragraph bold>
                    Praesent nec maximus justo. Cras accumsan velit vitae nunc ullamcorper condimentum. Nulla eget odio ultricies, sollicitudin velit ut, placerat arcu. Ut ac velit sed lacus scelerisque venenatis eget eu mi. Praesent tincidunt purus sed ipsum ullamcorper, a commodo justo imperdiet. Nulla elementum ut leo a commodo. Aenean in dignissim ligula. Nulla hendrerit purus id odio auctor mattis. Nulla aliquam semper vestibulum. Duis efficitur orci eu efficitur finibus. Quisque lobortis mi vel turpis suscipit, dignissim pharetra erat vulputate. Cras fringilla vulputate velit. Vestibulum semper lacinia fringilla.
                </Paragraph>
                <Paragraph bold>
                    Ut bibendum suscipit tempus. Integer turpis augue, suscipit at fringilla quis, faucibus sed neque. Vestibulum pharetra aliquam dapibus. Curabitur euismod euismod faucibus. Aliquam vel tincidunt ex. Donec commodo elementum consequat. Curabitur varius tincidunt nisi, sed viverra justo eleifend sit amet.
                </Paragraph>
                <Paragraph bold>
                    Nam elementum elit quis leo placerat congue. Nunc aliquam arcu dui, pharetra consequat eros laoreet ac. Duis in venenatis lacus, quis pellentesque augue. Donec eget nisl vitae quam iaculis suscipit ut quis massa. Nullam at suscipit ipsum. Nulla eget libero ultricies, aliquam odio non, tincidunt tellus. Integer ultricies sit amet nulla ut pretium.
                </Paragraph>
                <Paragraph bold>
                    Donec molestie dapibus ex, eget malesuada leo aliquet ut. Quisque in dictum nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc est enim, porttitor quis tellus sit amet, egestas mattis est. Mauris quis sem dictum ligula iaculis feugiat sed ac ante. Praesent tempor, mi at lobortis imperdiet, odio erat porta eros, id vestibulum urna ipsum at sapien. Aliquam lacinia finibus magna quis feugiat. Suspendisse pellentesque consectetur ligula, vestibulum volutpat orci malesuada a. Cras dapibus, massa a ullamcorper ullamcorper, nulla sapien condimentum risus, vel condimentum lacus tortor sed mauris. Sed ornare tincidunt dui.
                </Paragraph>
            </Modal>
        </Fragment>
    );
}

storiesOf('Modal', module)
    .addDecorator(story => <Global><Stage>{ story() }</Stage></Global>)
    .add('with text', () => <Demo/>)
;