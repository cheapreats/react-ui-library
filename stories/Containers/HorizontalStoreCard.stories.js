import React from 'react';
import { storiesOf } from '@storybook/react';
import { HorizontalStoreCard } from '../../src';
import { Dog } from '@styled-icons/fa-solid/Dog';

storiesOf('HorizontalStoreCard', module).add('with default', () => (
    <HorizontalStoreCard
        image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
        pictureTags={[{ icon: Dog, text: 'Dog' }]}
        headerTags={['$$', 'here', 'are', 'tags']}
        tags={['Free Shipping', 'Coupon', 'Coupon 2']}
        alt="coding Dog"
        width="600px"
        height="200px"
        rating="4"
        heading="Hot Dog"
        description="this is a Horizontal Store Card"
    />
));
