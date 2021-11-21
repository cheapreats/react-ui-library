import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export interface ICarouselTestimonialProps {
    carouselTitle: string;
    carouselImage: string;
    reviews: any[];
    isAutoplaying: boolean;
    carouselInterval: number;
    isLooping: boolean;
}
export declare const CarouselTestimonial: React.FC<ICarouselTestimonialProps>;
