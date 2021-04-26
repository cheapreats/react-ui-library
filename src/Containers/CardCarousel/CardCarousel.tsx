import styled, { createGlobalStyle } from 'styled-components';

import {
    Calendar,
    CreditCard,
    X,
    Hourglass,
    PersonFill,
    ArrowRepeat,
} from '@styled-icons/bootstrap';
import React from 'react';

export const CardCarousel: React.FC = () => (
    <>
        <Section>
            <Copy>
                <header>
                    <h1>Optimize the customer lifecycle</h1>
                </header>
                <p>
                    Use Stripe as a system of record for the customer lifecycle:
                    manage important events such as automatically provisioning
                    services for new subscribers or sending reminders for
                    renewals.
                </p>
            </Copy>
            <Carousel>
                <CarouselCard>
                    <CardHead>
                        <CreditCardIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Stripe automatically updated a Visa ending in 4242
                        </p>
                        <p className="subtitle">7 days ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <XIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Payment failed and an alert was sent
                        </p>
                        <p className="subtitle">7 hours ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CalendarIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Subscribed to Additional Storage
                        </p>
                        <p className="subtitle">10 days ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <HourglassIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">Trial ended for Bronze Plan</p>
                        <p className="subtitle">10 days ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CalendarIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">Subscribed to Bronze Plan</p>
                        <p className="subtitle">15 days ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <PersonIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Customer for Meghan Smith was created
                        </p>
                        <p className="subtitle">15 days ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <CreditCardIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Updated payment method to Visa ending in 4028
                        </p>
                        <p className="subtitle">2 hours ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <XIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Payment failed and an alert was sent
                        </p>
                        <p className="subtitle">7 hours ago</p>
                    </CardBody>
                </CarouselCard>
                <CarouselCard>
                    <CardHead>
                        <ArrowIcon size="35" />
                    </CardHead>
                    <CardBody>
                        <p className="title">
                            Changed subscription from Bronze Plan to Gold Plan
                        </p>
                        <p className="subtitle">1 day ago</p>
                    </CardBody>
                </CarouselCard>
            </Carousel>
        </Section>
        <GlobalStyle />
    </>
);

const GlobalStyle = createGlobalStyle`
  body {
      background-color: #f0f3f8;
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
        11.1111111111% {
            transform: translateY(100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        14.1111111111%,
        22.2222222222% {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        25.2222222222%,
        33.3333333333% {
            transform: translateY(-100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        36.3333333333% {
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
        11.1111111111% {
            transform: translateY(-100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        14.1111111111%,
        22.2222222222% {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
        }
        25.2222222222%,
        33.3333333333% {
            transform: translateY(100%) scale(0.7);
            opacity: 0.4;
            visibility: visible;
        }
        36.3333333333% {
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
    background-color: #17be54;
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


  .title {
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
  }

  .subtitle {
    background-color: #fff;
    font-size: 14px;

        @media (max-width: 600px) {
          font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 5px 40px 0px 75px;
`;

const Copy = styled.div`
  margin: 10% 60% 10% 5%;

  @media (max-width: 600px) {
      margin: 30px;
    }

    h1 {
      color: #17be54;
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
