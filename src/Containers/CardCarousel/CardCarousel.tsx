import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
    Calendar,
    CreditCard,
    X,
    Hourglass,
    PersonFill,
    ArrowRepeat,
} from '@styled-icons/bootstrap';

export interface CardCarouselProps {
    copyHeader: string;
    copyBody: string;
    cardTitle: string;
    cardSubtitle: string;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
    copyHeader,
    copyBody,
    cardTitle,
    cardSubtitle,
}) => (
    <>
        <Section>
            <Copy>
                <header>
                    <h1>{copyHeader}</h1>
                </header>
                <p>{copyBody}</p>
            </Copy>
            <Carousel>
                <CarouselCard>
                    <CardHead>
                        <CreditCardIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <XIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CalendarIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <HourglassIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CalendarIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <PersonIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CreditCardIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <XIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <ArrowIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <Title>{cardTitle}</Title>
                        <Subtitle>{cardSubtitle}</Subtitle>
                    </CardBody>
                </CarouselCard>
            </Carousel>
        </Section>
        <GlobalStyle />
    </>
);

const GlobalStyle = createGlobalStyle`
  body {
      background-color: #f5f5f5;
  }
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    margin-right: 65%;

    @media (max-width: 600px) {
        flex-direction: column;
        margin-right: 0%;
    }
`;

const Carousel = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: -45%;

    @media (max-width: 600px) {
        padding: 20% 0 0 50%;
    }

    @-webkit-keyframes carousel-animate-vertical {
        0% {
            transform: translateY(100%) scale(0.5);
            opacity: 0;
            visibility: hidden;
        }
        3%,
        11% {
            transform: translateY(100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        14%,
        22% {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        25%,
        33% {
            transform: translateY(-100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        36% {
            transform: translateY(-100%) scale(0.5);
            opacity: 0;
            visibility: visible;
        }
        100% {
            transform: translateY(-100%) scale(0.5);
            opacity: 0;
            visibility: hidden;
        }
    }

    @keyframes carousel-animate-vertical {
        0% {
            transform: translateY(-100%) scale(0.5);
            opacity: 0;
            visibility: hidden;
        }
        3%,
        11% {
            transform: translateY(-100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        14%,
        22% {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        25%,
        33% {
            transform: translateY(100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        36% {
            transform: translateY(100%) scale(0.5);
            opacity: 0;
            visibility: visible;
        }
        100% {
            transform: translateY(100%) scale(0.5);
            opacity: 0;
            visibility: hidden;
        }
    }
`;

const CarouselCard = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    width: 500px;
    height: 70px;
    opacity: 0;
    will-change: transform, opacity;
    -webkit-animation: carousel-animate-vertical 27s infinite;
    animation: carousel-animate-vertical 27s infinite;

    @media (max-width: 600px) {
        height: 65%;
        width: 80%;
    }

    &:nth-child(1) {
        -webkit-animation-delay: calc(3s * -1);
        animation-delay: calc(3s * -1);
    }

    &:nth-child(2) {
        -webkit-animation-delay: calc(3s * 0);
        animation-delay: calc(3s * 0);
    }

    &:nth-child(3) {
        -webkit-animation-delay: calc(3s * 1);
        animation-delay: calc(3s * 1);
    }

    &:nth-child(4) {
        -webkit-animation-delay: calc(3s * 2);
        animation-delay: calc(3s * 2);
    }

    &:nth-child(5) {
        -webkit-animation-delay: calc(3s * 3);
        animation-delay: calc(3s * 3);
    }

    &:nth-child(6) {
        -webkit-animation-delay: calc(3s * 4);
        animation-delay: calc(3s * 4);
    }

    &:nth-child(7) {
        -webkit-animation-delay: calc(3s * 5);
        animation-delay: calc(3s * 5);
    }

    &:nth-child(8) {
        -webkit-animation-delay: calc(3s * 6);
        animation-delay: calc(3s * 6);
    }

    &:last-child {
        -webkit-animation-delay: calc(-3s * 2);
        animation-delay: calc(-3s * 2);
    }
`;

const CardHead = styled.div`
    background-color: #ee272e;
    border-radius: 10% 0 0% 10%;
    width: 10%;
    height: 80%;
    padding: 7px;
    position: relative;
    margin-right: -10%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 4px 2px -2px gray;

    @media (max-width: 600px) {
        padding: 1%;
        height: 87%;
    }
`;

const CardBody = styled.div`
  width: 80%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 10% 0 13%;
  box-shadow: 0 4px 2px -2px gray;

  @media (max-width: 600px) {
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 5px 40px 0px 75px;
`;

const Title = styled.p`
    font-size: 16px;
    white-space: nowrap;
    margin-top: 3%;
    margin-bottom: -3%;
    background-color: #fff;
    font-weight: 600;

    @media (max-width: 600px) {
        font-size: 14px;
        margin-top: 2%;
    }
`;

const Subtitle = styled.p`
    background-color: #fff;
    font-size: 14px;

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const Copy = styled.div`
  margin: 10% 60% 10% 5%;

  @media (max-width: 600px) {
      margin: 30px;
    }

    h1 {
      color: #000;
      font-size: 24px;
    }

    p {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-size: 18px;
    }
  }
`;

const CalendarIcon = styled(Calendar)`
    color: white;
`;

const CreditCardIcon = styled(CreditCard)`
    color: white;
`;

const XIcon = styled(X)`
    color: white;
`;

const HourglassIcon = styled(Hourglass)`
    color: white;
`;

const PersonIcon = styled(PersonFill)`
    color: white;
`;

const ArrowIcon = styled(ArrowRepeat)`
    color: white;
`;
