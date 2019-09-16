import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';
import { Modal, Button } from '../../src';

storiesOf('Modal', module)
    .addDecorator(withKnobs)
    .add(
        'with mock',
        mockElement(
            (modal1, modal2) => (
                <>
                    <Button onClick={() => modal1[1](true)}>
                        Open modal one
                    </Button>
                    <Modal state={modal1} padding="20px">
                        Modal One
                        <Button onClick={() => modal2[1](true)}>
                            Open modal two
                        </Button>
                    </Modal>
                    <Modal state={modal2} padding="20px">
                        Modal Two
                    </Modal>
                </>
            ),
            false,
            false,
        ),
    )
    .add('with default', () => (
        <Modal state={[boolean('Show', true), () => alert('Closes the modal')]}>
            {text(
                'Text',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac ligula vel velit scelerisque fringilla dictum ullamcorper felis. Vestibulum lacus erat, congue eu hendrerit ut, lobortis et velit. Sed lacinia ligula vitae sapien sagittis, in posuere nibh pellentesque. Fusce tincidunt orci non condimentum venenatis. Etiam in finibus magna. Fusce ut lorem ut mi molestie lacinia vel sit amet dui. Vestibulum ut ligula in lorem vehicula hendrerit luctus id erat. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend metus orci, in tempor magna molestie ut. Morbi laoreet pellentesque diam.',
            )}
        </Modal>
    ))
    .add('with onClose', () => (
        <Modal
            state={[boolean('Show', true), () => alert('Closes the modal')]}
            onClose={() => alert('Close callback')}
        >
            {text(
                'Text',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac ligula vel velit scelerisque fringilla dictum ullamcorper felis. Vestibulum lacus erat, congue eu hendrerit ut, lobortis et velit. Sed lacinia ligula vitae sapien sagittis, in posuere nibh pellentesque. Fusce tincidunt orci non condimentum venenatis. Etiam in finibus magna. Fusce ut lorem ut mi molestie lacinia vel sit amet dui. Vestibulum ut ligula in lorem vehicula hendrerit luctus id erat. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend metus orci, in tempor magna molestie ut. Morbi laoreet pellentesque diam.',
            )}
        </Modal>
    ));
