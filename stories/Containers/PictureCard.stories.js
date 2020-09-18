import React from 'react';
import { storiesOf } from '@storybook/react';
import { PictureCard, Paragraph, SmallText } from '../../src';
import { Dog } from '@styled-icons/fa-solid/Dog';
import { Cat } from '@styled-icons/fa-solid/Cat';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Picture Card'), module)
    .add('with image', () => (
        <PictureCard
            image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
            tags={[]}
            alt="coding Dog"
            width="400px"
            height="200px"
            borderRadiusTop="25px"
            borderRadiusBottom="0px"
        />
    ))
    .add('with tags', () => (
        <PictureCard
            image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
            tags={[{ icon: Dog, text: 'Dog' }, { icon: Cat }, { text: 'hmm?' }]}
            alt="coding Dog"
            width="400px"
            height="200px"
        />
    ));
