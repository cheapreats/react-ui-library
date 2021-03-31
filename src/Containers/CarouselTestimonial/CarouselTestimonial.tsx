import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface ICarouselTestimonialProps {
    carouselTitle: string;
    carouselImage: string;
    reviewDescriptions: string[];
    reviewers: string[];
    carouselAutoplay: boolean;
    carouselInterval: number;
    carouselLoop: boolean;
}

export const CarouselTestimonial: React.FC<ICarouselTestimonialProps> = ({
    carouselTitle,
    carouselImage,
    reviewDescriptions,
    reviewers,
    carouselAutoplay,
    carouselInterval,
    carouselLoop,
}) => {
    /**
     * Returns the JSX element of each carousel item based on its index
     */
    const getCarouselItem = (index: number) => (
        <Section key={index}>
            <TitleDiv key={carouselTitle}>{carouselTitle}</TitleDiv>
            <ImageDiv key={carouselImage}>
                <img src={carouselImage} />
            </ImageDiv>
            <ReviewTextDiv>
                {reviewDescriptions[index]}
            </ReviewTextDiv>
            <ReviwerDiv>
                {reviewers[index]}
            </ReviwerDiv>
        </Section>
    );

    /**
     * Returns all carousel items
     */
    const getCarousel = () => {
        let index = 0;
        return reviewDescriptions.map(() => getCarouselItem(index++));
    };
    return (
        <Carousel
            autoPlay={carouselAutoplay}
            interval={carouselInterval}
            infiniteLoop={carouselLoop}
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
    color: black;
    font-family: "Square Market", Helvetica, Arial, sans-serif;"
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
    color: #006aff ;
`;
const ReviwerDiv = styled.div`
    font-weight: 600;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.colors.chairTableBackground};
    font-size:  1em;
     `;


