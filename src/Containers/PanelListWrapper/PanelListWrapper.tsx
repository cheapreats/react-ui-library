import { MainInterface, Main } from '@Utils/BaseStyles';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PanelCard, IPanelCardProps } from '../PanelCard/PanelCard';
import { useSequentiallyAddedPanels } from './useSequentiallyAddedPanels';

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
    fadeIn?:number;
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAddPanelsSequentially = false,
    delaySequentially = 100,
    fadeIn=1000,
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

    return (
        <PanelListWrapperBox {...props}>
            {panelsToMap.map((panel) => (
                <PanelCardFadeIn
                    key={`${panel.name}`}
                    {...panel}
                    margin={`${verticalSpacing}px 0`}
                    fadeIn={fadeIn}
                />
            ))}
        </PanelListWrapperBox>
    );
};

const PanelListWrapperBox = styled.div<MainInterface>`
    ${(props) => Main({ ...props })}
`;

const PanelCardFadeIn=styled(PanelCard)<{fadeIn:number}>`
@keyframes fadein{
    from{opacity:0;}
    to{opacity:1;}
}
animation:fadein ${({fadeIn})=>fadeIn}ms;
`
