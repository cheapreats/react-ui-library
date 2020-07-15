import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ImageCarousel } from '../../src';

const images = [
    'https://image.shutterstock.com/image-photo/image-250nw-1081879181.jpg',
    'https://i.pinimg.com/originals/a0/0b/0b/a00b0bf24ae9b9637ca506825dda34a3.jpg',
    'https://boygeniusreport.files.wordpress.com/2016/05/scared-surprised-cat-face.jpg?quality=98&strip=all&w=782',
];

storiesOf('Image Carousel', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <ImageCarousel
            imageData={images}
            pointer
            onClick={() => console.log('Clicked!')}
            icon
            overlay
            overlayText="Editable Text"
            altText="Funny Image"
        ></ImageCarousel>
    ));
