import { MainInterface, Main } from '@Utils/BaseStyles';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PanelCard, IPanelCardProps } from '../PanelCard/PanelCard';
import { useSequentiallyAddedPanels } from './useSequentiallyAddedPanels';
import { useFadeOut } from './useFadeOut';

export interface IPanelListWrapperProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    panels: IPanelCardProps[];
    /** vertical space between panels in px */
    verticalSpacing?: number;
    /** if true panels are added sequentially to the list */
    isAddPanelsSequentially?: boolean;
    /** dealy in ms for each panel added to the list */
    delay?: number;
    /** fade in in ms */
    fadeIn?: number;
    /** fade out in ms */
    fadeOut?: number;
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAddPanelsSequentially = false,
    delay = 100,
    fadeIn = 1000,
    fadeOut = 1000,
    ...props
}) => {
    const sequentiallyPanels = useSequentiallyAddedPanels(panels, delay);
    const panelsToMap = useMemo(
        (): IPanelCardProps[] =>
            isAddPanelsSequentially ? sequentiallyPanels : panels,
        [isAddPanelsSequentially, sequentiallyPanels, panels],
    );
    const [fadeOutPanels, onAnimationEnd] = useFadeOut(panelsToMap);

    return (
        <PanelListWrapperBox {...props}>
            {fadeOutPanels.map(({ panel, isShown }) => (
                <PanelCardFadeOut
                    key={`${panel.name}`}
                    {...panel}
                    margin={`${verticalSpacing}px 0`}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    isShown={isShown}
                    onAnimationEnd={onAnimationEnd}
                />
            ))}
        </PanelListWrapperBox>
    );
};

const PanelListWrapperBox = styled.div<MainInterface>`
    ${(props) => Main({ ...props })}
`;

const PanelCardFadeIn = styled(PanelCard)<{ fadeIn: number }>`
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: fadein ${({ fadeIn }) => fadeIn}ms;
`;

const PanelCardFadeOut = styled(PanelCardFadeIn)<{
    isShown: boolean;
    fadeOut: number;
}>`
    @keyframes fadeout {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    ${({ isShown, fadeOut }) => `
${isShown ? '' : `animation:fadeout ${fadeOut}ms;`}
`}
`;
