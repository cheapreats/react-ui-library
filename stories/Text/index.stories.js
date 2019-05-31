import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Heading, Paragraph, SmallText } from '../../src';

storiesOf('Text', module)
    .addDecorator(withKnobs)
    .add('with Heading', () => {
        const t = text('Text', 'Headings Everywhere');
        const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        return (
            <Fragment>
                {
                    types.map(type => (
                        <Heading
                            bold={ boolean('Bold', false) } 
                            key={ type }
                            type={ type }
                        >
                            { t }
                        </Heading>
                    ))
                }
            </Fragment>
        );
    })
    .add('with Paragraph', () => (
        <Paragraph
            bold={ boolean('Bold', false) }
        >
            { text('Text', 'Lorem Ipsum') }
        </Paragraph>
    ))
    .add('with SmallText', () => (
        <SmallText
            bold={ boolean('Bold', false) }
        >
            { text('Text', 'Small Lorem Ipsum') }
        </SmallText>
    ))
;
