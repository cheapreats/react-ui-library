import { BagFill, InfoCircleFill } from "@styled-icons/bootstrap";
import { Button } from "@Inputs/Button/Button";
import { CarouselTestimonial } from "@Containers";
import { Heading } from '@Text/Heading';
import { ThreeSectionTemplate, IThreeSectionProps } from './ThreeSectionTemplate';
import { MainTheme } from "@Themes/MainTheme";
import { Meta, Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Snowfall from "react-snowfall";
import { flex } from "@Utils/Mixins";

const LOGO =
  "https://www.cheapreats.com/static/90939a6dc8dacea8e44d046c72521a1b/16c7d/logo.png";
const IMAGE =
  "https://images.unsplash.com/photo-1604573714289-312a6972f67c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

const howItWorksHeadingProps = {
  color: 'black',
   bold: true,
  children: 'How it works',
}
const welcomeHeadingProps = {
    type: 'h1',
    color: 'black',
    bold: true,
    size: '3rem',
    lineHeight: '1.3',
    children: (
    <div>
        Welcome to the CheaprEats
        <br />
        Voice Ordering System
    </div>),
};
const startOrderButtonProps = {
    icon: BagFill,
    primary: true,
    iconSize: '20px',
};
const learnMoreButtonProps = {
    icon: InfoCircleFill,
    iconSize: '20px',
};
const carouselDetails = {
    carouselTitle: '',
    carouselImage: '',
    reviews: [
        { testimony: "Follow the instructions of the chat bot", reviewer: "" },
        { testimony: "Order with your voice or text", reviewer: "" },
        { testimony: "Scan the QR code to pay", reviewer: "" },
      ],
      isAutoplaying: true,
      carouselInterval: 5000,
      isLooping: true,
};

const StyledImg = styled.img`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default {
    title: 'Voice User Interface/ThreeSection/ThreeSection Template',
    component: ThreeSectionTemplate,
    args: {
        bottomLeftSectionColor: MainTheme.colors.primary,
        parallaxProps: {
            blur: { min: -8, max: 8 },
            bgImage: IMAGE,
            strength: 300,
        },
        topSectionChildren: (
          <>
            <Heading style={{zIndex: 1}} {...welcomeHeadingProps} />
            <Button  {...startOrderButtonProps} />
            <Button {...learnMoreButtonProps} />
            <Snowfall color={MainTheme.colors.primary} />
          </>
        ),
        bottomLeftSectionChildren: (
            <>
                <StyledImg src={LOGO} />
            </>
        ),
        bottomRightSectionChildren: (
            <>
                <Heading {...howItWorksHeadingProps} />
                <CarouselTestimonial {...carouselDetails} />
                <Button  {...startOrderButtonProps} />
            </>
        )
    },
} as Meta;


export const Empty: Story<IThreeSectionProps> = () => (
  <ThreeSectionTemplate {...{
    topSectionColor: 'red',
    bottomLeftSectionColor: 'green',
    bottomRightSectionColor: 'blue',
  }} />
);

export const Homepage: Story<IThreeSectionProps> = (args) => (
    <ThreeSectionTemplate {...args} />
);