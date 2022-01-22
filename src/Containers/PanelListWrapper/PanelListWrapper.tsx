import { MainInterface, Main } from '@Utils/BaseStyles';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { PanelCard, IPanelCardProps } from '../PanelCard/PanelCard';

export interface IPanelListWrapperProps
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    panels: IPanelCardProps[];
    /** vertical space between panels in px */
    verticalSpacing?: number;
    /** if true panels are added sequentially to the list */
    isAddPanelsSequentially?: boolean;
    /** dealy in ms for each panel added to the list */
    delaySequentially?:number;
}

export const PanelListWrapper: React.FC<IPanelListWrapperProps> = ({
    panels,
    verticalSpacing,
    isAddPanelsSequentially = false,
    delaySequentially=100,
    ...props
}) => {
    const internalPanels = useSequentiallyAddedPanels(panels,delaySequentially);
    const panelsToMap = useMemo(
        (): IPanelCardProps[] => (isAddPanelsSequentially ? internalPanels : panels),
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

/**
 * add panels sequentially
 * @param panels {IPanelCardProps[]} array of panel properties 
 * @param delay {number} delay in ms to add each panel to the list 
 * @returns {IPanelCardProps[]} array of panels to be added sequentially
 */
const useSequentiallyAddedPanels = (panels:IPanelCardProps[],delay:number) => {
    const [internalPanels, setInternalPanels] = useState<IPanelCardProps[]>([]);
    const [panelIndexCounter, setPanelIndexCounter] = useState<number>(0);
    const previousPanelsLength = useRef<number|undefined>();

    useEffect(() => {
        if (!previousPanelsLength.current||previousPanelsLength.current < panels.length) {
            setTimeout(() => {
                const panelToAdd = panels[panelIndexCounter];
                if (panelToAdd) {
                    setInternalPanels((prev) => [...prev, panelToAdd]);
                    setPanelIndexCounter((prev) => prev + 1);
                } else {
                    previousPanelsLength.current = panels.length;
                }
            }, delay);
        } else {
            setInternalPanels((prev) =>
                prev.filter((internalPanel) =>
                    panels.some((panel) => panel.name === internalPanel.name),
                ),
            );
            setPanelIndexCounter(panels.length);
            previousPanelsLength.current = panels.length;
        }
    }, [panels, panelIndexCounter,delay]);

    return internalPanels;
};
