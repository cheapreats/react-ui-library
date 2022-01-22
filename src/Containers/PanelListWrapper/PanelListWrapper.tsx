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
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAddPanelsSequentially = false,
    delaySequentially = 100,
    ...props
}) => {
    const internalPanels = useSequentiallyAddedPanels(
        panels,
        delaySequentially,
    );
    const panelsToMap = useMemo(
        (): IPanelCardProps[] =>
            isAddPanelsSequentially ? internalPanels : panels,
        [isAddPanelsSequentially, internalPanels, panels],
    );

    return (
        <PanelListWrapperBox {...props}>
            {panelsToMap.map((panel) => (
                <PanelCard
                    key={`${panel.name}`}
                    {...panel}
                    margin={`${verticalSpacing}px 0`}
                />
            ))}
        </PanelListWrapperBox>
    );
};

const PanelListWrapperBox = styled.div<MainInterface>`
    ${(props) => Main({ ...props })}
`;
