const STORY_TEMPLATE = (name, path) => (
`import React from 'react';
import { storiesOf } from '@storybook/react';
import { ${ name } } from '${ path }';
import { action } from '@storybook/addon-actions';

storiesOf('${ name }', module)
    .add('GENERATED', () => (
        <${ name }>Bye World!</${ name }>
    ))
;
`
);

const COMPONENT_TEMPLATE = name => (
`import React from 'react';
import styled from 'styled-components';

export const ${ name } = () => {
    return (
        <h1>Hello World!</h1>
    );
}
`
);