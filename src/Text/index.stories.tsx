import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text as textKnob, boolean } from '@storybook/addon-knobs';
import { Heading, Paragraph, SmallText } from '../index';
import { createStoryTitle } from '../Constants';

const knobs = ({ text = 'Text', bold = false, color = 'Black' }) => ({
    text: textKnob('Text', text),
    bold: boolean('Bold', bold),
    color: textKnob('Color', color),
});

storiesOf(createStoryTitle('Text'), module)
    .addDecorator(withKnobs)
    .add('with Heading', () => {
        const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const { text, ...props } = knobs({
            text: 'Headings Everywhere!',
        });
        return (
            <Fragment>
                {types.map((type) => (
                    <Heading key={type} type={type} {...props}>
                        {text}
                    </Heading>
                ))}
            </Fragment>
        );
    })
    .add('with Paragraph', () => {
        const { text, ...props } = knobs({
            text: 'Lorem Ipsum',
        });
        return <Paragraph {...props}>{text}</Paragraph>;
    })
    .add('with SmallText', () => {
        const { text, ...props } = knobs({
            text: 'Small Lorem Ipsum',
        });
        return <SmallText {...props}>{text}</SmallText>;
    });
