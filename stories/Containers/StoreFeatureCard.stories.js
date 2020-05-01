import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoreFeatureCard } from '../../src';
import {Dog} from 'styled-icons/fa-solid/Dog';
import {Cat} from 'styled-icons/fa-solid/Cat';

storiesOf('Store Feature Card', module)
    .add('with default', () => (
        <StoreFeatureCard
            image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
            tags={[{ icon: Dog, text: 'Dog' }, { icon: Cat }, { text: 'hmm?' }]}
            alt="coding Dog"
            width="400px"
            height="200px"
            rating="4"
            heading="Hot Dog"
            description="this is a Store Feature Card"
        />))
    .add('as Store Review Card', () => (
        <StoreFeatureCard
            image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
            tags={[{ icon: Dog, text: 'Dog' }, { icon: Cat }, { text: 'hmm?' }]}
            alt="coding Dog"
            width="400px"
            height="200px"
            rating="4"
            heading="Hot Dog"
            linktitle="VISIT STORE"
            description="this is a Store Review Card"
    />    
    ));
