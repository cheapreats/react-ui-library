import { flex } from '@Utils/Mixins';
import { MainTheme } from '@Themes/MainTheme';
import { Parallax } from "react-parallax";
import React from 'react';
import styled from 'styled-components';

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
              <Section>
                <HomepageContainer children={topSectionChildren} />
              </Section>
        </Parallax>
        <Section>
            <Subsection bgCol={logoSubSectionColor} 
              children={bottomLeftSectionChildren} />
            <Subsection children={bottomRightSectionChildren} />
        </Section>
    </ThreeSectionContainer>
);

const HomepageContainer = styled.div`
  ${flex('column')};
  :before {
    content: "";
    position: absolute;
    left: -10;
    width: 150vw;
    height: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    transform: rotateZ(${ROTDEGREE}deg);
  }
  align-items: center;
  justify-content: center;
`;

const ThreeSectionContainer = styled.div``;

const Section = styled.div`
  ${flex()};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  height: 100vh;
`;

const Subsection = styled.div<{ bgCol?: string }>`
  ${flex('column')};
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