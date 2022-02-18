import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ImageCarousel, ImageCarouselProps } from '../../index';


const images = [
    'https://image.shutterstock.com/image-photo/image-250nw-1081879181.jpg',
    'https://i.pinimg.com/originals/a0/0b/0b/a00b0bf24ae9b9637ca506825dda34a3.jpg',
    'https://boygeniusreport.files.wordpress.com/2016/05/scared-surprised-cat-face.jpg?quality=98&strip=all&w=782',
];

export default {
    title: 'Components/Menu Item/Image Carousel',
    component: ImageCarousel,
    argTypes: { onClick: { action: 'Clicked!' } },
    args: {
        imageData: images,
        altText: 'Funny Image',
    },
} as Meta;

export const Basic: Story<ImageCarouselProps> = (args) => (
    <ImageCarousel {...args} />
);
