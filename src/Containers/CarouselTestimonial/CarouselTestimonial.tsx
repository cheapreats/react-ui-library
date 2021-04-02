import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface ICarouselTestimonialProps {
    carouselTitle: string;
    carouselImage: string;
    reviews: any[];
    isAutoplaying: boolean;
    carouselInterval: number;
    isLooping: boolean;
}

export const CarouselTestimonial: React.FC<ICarouselTestimonialProps> = ({
    carouselTitle,
    carouselImage,
    reviews,
    isAutoplaying,
    carouselInterval,
    isLooping,
}) => {
    /**
     * Returns the JSX element of each carousel item 
     */
    const getCarouselItem = (review: any) => (
        <Section key={review}>
            <TitleDiv key={carouselTitle}>
                {carouselTitle}
            </TitleDiv>
            <ImageDiv key={carouselImage}>
                <img src={carouselImage} alt='' />
            </ImageDiv>
            <ReviewTextDiv>
                {review.testimony}
            </ReviewTextDiv>
            <ReviwerDiv>
                {review.reviewer}
            </ReviwerDiv>
        </Section>
    );

    /**
     * Returns JSX elements of all carousel items
     */
    const getCarousel = () => reviews.map((review: any) => getCarouselItem(review));
    return (
        <Carousel
            autoPlay={isAutoplaying}
            interval={carouselInterval}
            infiniteLoop={isLooping}
        >
            {getCarousel()}
        </Carousel>
    );
};

const Section = styled.div`
    margin: 10px 0px 10px 0px;
`;
const TitleDiv = styled.div`
    font-size:16px;
    color: ${({ theme }) => theme.colors.text};
    `;
const ImageDiv = styled.div`
    margin-top: 10px;
    max-width: 90px;
    margin-left: auto;
    margin-right: auto;
`;
const ReviewTextDiv = styled.div`
    margin-bottom: 14px;
    margin-top: 28px;
    font-size: 1.5em;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied}; 
`;
const ReviwerDiv = styled.div`
    font-weight: 600;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.colors.chairTableBackground};
    font-size:  1em;
     `;


