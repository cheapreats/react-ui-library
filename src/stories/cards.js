import React from 'react';
import { storiesOf } from '@storybook/react';
import { SimpleCard } from '../components/cards/cards';
import { withKnobs, text, number} from '@storybook/addon-knobs';
import { HeadingOne, HeadingTwo } from '../components';
 

const stories = storiesOf('Card', module);
stories.addDecorator(withKnobs);

stories
    .add('SimpleCard', () => (
        <SimpleCard percentage={'30'} >
            <HeadingOne bold primary>
                Hello
            </HeadingOne>
            <HeadingTwo primary>
                here is the content of the card
            </HeadingTwo>
        </SimpleCard>
    ), {
        notes: `A Simple Card`
    })
    .add('Card as dynamic variables', () => {
        const name = text('Name', 'Arunoda Susiripala');
        const age = number('Age', 89);
        const greet = text('Greeting messages', 'Hello');
        const greeting = `${greet}`;
        const content = `I am ${name} and I'm ${age} years old.`;
        return (<SimpleCard percentage={'30'} >
                    <HeadingOne bold primary>
                        {greeting}
                    </HeadingOne>
                    <HeadingTwo primary>
                        {content}
                    </HeadingTwo>
                </SimpleCard>
                );
});