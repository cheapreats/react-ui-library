import React from 'react';
import { storiesOf } from '@storybook/react';
import { AnimatedCard } from '../components/animatedCard/animatedCard';
import { withKnobs, text, number} from '@storybook/addon-knobs';
import { HeadingOne, HeadingTwo, Card } from '../components';
 

const stories = storiesOf('AnimatedCard', module);
stories.addDecorator(withKnobs);

stories
    .add('Simple Animated Card', () => (
        <Card>
            <AnimatedCard percentage={'30'} >
                <HeadingOne bold>
                    Hello
                </HeadingOne>
                <HeadingTwo>
                    here is the content of the card
                </HeadingTwo>
            </AnimatedCard>
        </Card>
    ), {
        notes: `A Simple Card with animated circle`
    })
    .add('Card as dynamic variables', () => {
        const name = text('Name', 'Arunoda Susiripala');
        const age = number('Age', 89);
        const percentage = number('Percentage', 30);
        const greet = text('Greeting messages', 'Hello');
        const content = `I am ${name} and I'm ${age} years old.`;
        return (
        <Card>
            <AnimatedCard percentage={percentage} >
                <HeadingOne bold>
                        {greet}
                </HeadingOne>
                <HeadingTwo>
                        {content}
                </HeadingTwo>
            </AnimatedCard>
        </Card>
                );
    }, {
        notes: `A customizable Card with animated circle`
    });