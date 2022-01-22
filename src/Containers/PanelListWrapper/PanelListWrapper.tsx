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
    delaySequentially?: number;
    /** fade in in ms */
    fadeIn?: number;
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAddPanelsSequentially = false,
    delaySequentially = 100,
    fadeIn = 1000,
    ...props
}) => {
    const sequentiallyPanels = useSequentiallyAddedPanels(
        panels,
        delaySequentially,
    );
    const panelsToMap = useMemo(
        (): IPanelCardProps[] =>
            isAddPanelsSequentially ? sequentiallyPanels : panels,
        [isAddPanelsSequentially, sequentiallyPanels, panels],
    );
    const [fadeOutPanels, setFadeOutPanels] = useFadeOut(panelsToMap);

    const removePanelsIsShownIsFalse = () => {
        setFadeOutPanels((prev) =>
            prev.filter((fadeOutPanel) => fadeOutPanel.isShown),
        );
    };

    return (
        <PanelListWrapperBox {...props}>
            {fadeOutPanels.map(({ panel, isShown }) => (
                <PanelCardFadeOut
                    key={`${panel.name}`}
                    {...panel}
                    margin={`${verticalSpacing}px 0`}
                    fadeIn={fadeIn}
                    isShown={isShown}
                    onAnimationEnd={removePanelsIsShownIsFalse}
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

const PanelCardFadeOut = styled(PanelCardFadeIn)<{ isShown: boolean }>`
    @keyframes fadeout {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    ${({ isShown }) => `
${isShown ? '' : 'animation:fadeout 1000ms;'}
`}
`;
