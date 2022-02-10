import { MainTheme } from '@Themes/MainTheme';
import { Parallax } from "react-parallax";
import React from 'react';
import styled from 'styled-components';


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

interface IParallaxProps {
  blur: Blur;
  bgImage: string;
  strength: number;
}

export interface IThreeSectionProps {
  topSectionChildren?: React.ReactElement;
  bottomLeftSectionChildren?: React.ReactElement;
  bottomRightSectionChildren?: React.ReactElement;
  parallaxProps?: IParallaxProps;
  logoSubSectionColor?: string;
}

export const ThreeSectionTemplate: React.FC<IThreeSectionProps> = ({
  topSectionChildren,
  bottomLeftSectionChildren,
  bottomRightSectionChildren,
  parallaxProps,
  logoSubSectionColor = MainTheme.colors.primary,
  ...props
}): React.ReactElement => (
    <ThreeSectionContainer {...props}>
        <Parallax {...parallaxProps} >
            <Section children={topSectionChildren} />
        </Parallax>
        <Section>
            <Subsection bgCol={logoSubSectionColor} 
              children={bottomLeftSectionChildren} />
            <Subsection children={bottomRightSectionChildren} />
        </Section>
    </ThreeSectionContainer>
);

const ThreeSectionContainer = styled.div``;


const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  height: 100vh;
`;

const Subsection = styled.div<{ bgCol?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 50%;
  height: 100vh;
  ${({ bgCol }): string => `
    background-color: ${bgCol};
  `}
`;



export default ThreeSectionTemplate;