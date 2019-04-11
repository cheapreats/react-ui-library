import React from 'react';
import { storiesOf } from '@storybook/react';
import { PictureCard, preview, Heading, Rating, Row, ActiveText, SmallText } from '../components';
import { Dog, Poo, Compass } from 'styled-icons/fa-solid';
const { Global } = preview;

storiesOf('PictureCard', module)
    .addDecorator(story => <Global>{ story() }</Global>)
    .add('with image', () => (
        <PictureCard
            image='https://i.ibb.co/HF6q3BF/doggo.gif'
        />
    ), {
        notes: `Recommended Ratio, 4:3. This takes in same props as Card and has maxWidth of 300px (Changeable)`
    })
    .add('with tags', () => (
        <PictureCard
            image='https://i.ibb.co/HF6q3BF/doggo.gif'
            tags={[
                { icon: Dog, text: 'Doggos' },
                { icon: Poo },
                { text: 'Bork' }
            ]}
        />
    ), {
        notes: `Format => { icon: StyledIcons?, text: String? } (We expect at least one of them)`
    })
    .add('with staged', () => (
        <PictureCard
            image='https://i.ibb.co/HF6q3BF/doggo.gif'
            tags={[{ icon: Compass, text: 'Front of Student Centre, UTSC' }]}
        >
            <Row center>
                <Heading type='h4' margin='0' bold>Nasir's Hotdog Stand</Heading>
                <Rating margin='0 0 0 auto' rating='4'/>
            </Row>
            <ActiveText margin='0'><SmallText bold margin='0'>Closed</SmallText></ActiveText>
        </PictureCard>
    ), {
        notes: `Format => { icon: StyledIcons?, text: String? } (We expect at least one of them)`
    })
;