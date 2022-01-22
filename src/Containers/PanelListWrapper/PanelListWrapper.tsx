import { MainInterface, Main } from '@Utils/BaseStyles';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { PanelCard, IPanelCardProps } from '../PanelCard/PanelCard';

const DELAY_IN_MOUNTING_IN_MS = 100;

export interface IPanelListWrapperProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    panels: IPanelCardProps[];
    /** vertical space between panels in px */
    verticalSpacing?: number;
    /** if true panels are added sequentially to the list */
    isAnimatedPanels?: boolean;
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAnimatedPanels = false,
    ...props
}) => {
    const internalPanels = useAnimatedPanels(panels);
    const panelsToMap = useMemo(
        (): IPanelCardProps[] => (isAnimatedPanels ? internalPanels : panels),
        [isAnimatedPanels, internalPanels, panels],
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

const useAnimatedPanels = (panels:IPanelCardProps[]) => {
    const [internalPanels, setInternalPanels] = useState<IPanelCardProps[]>([]);
    const [panelIndex, setPanelIndex] = useState<number>(0);
    const panelsLength = useMemo(() => panels.length, [panels]);
    const previousPanelsLength = useRef<number|undefined>();

    const incrementPanelIndex = () => {
        setPanelIndex((prev) => prev + 1);
    };

    useEffect(() => {
        if (!previousPanelsLength.current||previousPanelsLength.current < panelsLength) {
            setTimeout(() => {
                const panelToAdd = panels[panelIndex];
                if (panelToAdd) {
                    setInternalPanels((prev) => [...prev, panelToAdd]);
                    incrementPanelIndex();
                } else {
                    previousPanelsLength.current = panelsLength;
                }
            }, DELAY_IN_MOUNTING_IN_MS);
        } else {
            setInternalPanels((prev) =>
                prev.filter((internalPanel) =>
                    panels.some((panel) => panel.name === internalPanel.name),
                ),
            );
            setPanelIndex(0);
            previousPanelsLength.current = 0;
        }
    }, [panelsLength, panels, panelIndex]);

    return internalPanels;
};
