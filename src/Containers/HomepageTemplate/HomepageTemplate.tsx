import { Button, ButtonProps } from "@Inputs/Button/Button";
import { CarouselTestimonial } from "@Containers";
import { Heading } from '@Text/Heading';
import { Parallax } from "react-parallax";
import React from 'react';
import styled from 'styled-components';
import Snowfall from "react-snowfall";

const ROTDEGREE = -4;

/**
 * Blur transitions from min to max blur
 * Scale:
 *  0 - no blur
 *  5 - maximum blur
 */
type Blur = {
    min: number;
    max: number;
}

type Review = {
    testimony: string;
    reviewer: string;
}

interface IParallaxProps {
    blur: Blur;
    bgImage: string;
    strength: number;
}

interface ICarouselTestimonialProps {
    carouselTitle: string;
    carouselImage: string;
    reviews: Review[];
    isAutoplaying: boolean;
    carouselInterval: number;
    isLooping: boolean;
}

interface welcomeHeadingProps {
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children?: React.ReactElement
}

/**
 * @property {ButtonProps} startOrderButtonProps - Order button
 * @property {ButtonProps} learnMoreButtonProps - Intended to scroll to 'Learn More' section
 * @property {string} logoURL - Displays logo in 'Learn More' section
 * @property {IParallaxProps} parallaxProps - Declares Parallax in 'Welcome' section
 * @property {ICarouselTestimonialProps} carouselDetails - CarouselTestimonial info
 * @property {welcomeHeadingProps} - Allows for ReactNode in children
 * @property {howItWorksText} - Declares 'How it Works' subsection
 * @property {snowFallColor} - Declares Snow Fall in 'Welcome' Section
 * @property {logoSubSectionColor} - Sets color around logo
 */
export interface IHomepageProps 
    extends React.HTMLAttributes<HTMLDivElement> {
    startOrderButtonProps: ButtonProps;
    learnMoreButtonProps: ButtonProps;
    logoURL: string;
    parallaxProps: IParallaxProps;
    carouselDetails: ICarouselTestimonialProps;
    welcomeHeading: welcomeHeadingProps;
    howItWorksText: string;
    snowFallColor: string;
    logoSubSectionColor: string;
}

export const HomepageTemplate: React.FC<IHomepageProps> = ({
    startOrderButtonProps,
    learnMoreButtonProps,
    logoURL,
    parallaxProps,
    carouselDetails,
    welcomeHeading,
    howItWorksText,
    snowFallColor,
    logoSubSectionColor,
    ...props
}): React.ReactElement => (
    <HomepageContainer {...props}>
        <Parallax {...parallaxProps} >
            <Section>
                <Container>
                    <WelcomeHeading {...welcomeHeading} />
                    <StyledButton  {...startOrderButtonProps} />
                    <StyledButton {...learnMoreButtonProps} />
                </Container>
            </Section>
            <Snowfall color={snowFallColor} />
        </Parallax>
        <Section>
            <Subsection bgCol={logoSubSectionColor}>
                <StyledImg src={logoURL} />
            </Subsection>
            <Subsection>
                <StyledSectionHeading children={howItWorksText} />
                <CarouselTestimonial {...carouselDetails} />
                <StyledButton  {...startOrderButtonProps} />
            </Subsection>
        </Section>
    </HomepageContainer>
);

const HomepageContainer = styled.div``;

const Container = styled.div`
  :before {
    content: "";
    position: absolute;
    left: -10;
    width: 150vw;
    height: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    transform: rotateZ(${ROTDEGREE}deg);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledSectionHeading = styled(Heading)`
  color: black;
  font-weight: bold;
`;

const Subsection = styled.div<{ bgCol?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 50%;
  height: 100vh;
  background-color: ${(p) => p.bgCol || "#FFF"};
`;

const WelcomeHeading = styled(Heading)`
  margin: 0 0 10px 0;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.3;
  max-width: 100%; 
  z-index: 1;
`;

export default HomepageTemplate;