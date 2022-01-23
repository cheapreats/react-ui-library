import { useEffect, useRef, useState } from 'react';
import { IPanelCardProps } from '../PanelCard/PanelCard';

/**
 * add panels sequentially
 * @param panels {IPanelCardProps[]} array of panel properties
 * @param delay {number} delay in ms to add each panel to the list
 * @returns {IPanelCardProps[]} array of panels to be added sequentially
 */
export const useSequentiallyAddedPanels = (
    panels: IPanelCardProps[],
    delay: number,
): IPanelCardProps[] => {
    const [internalPanels, setInternalPanels] = useState<IPanelCardProps[]>([]);
    const [panelIndexCounter, setPanelIndexCounter] = useState<number>(0);
    const previousPanelsLength = useRef<number | undefined>();

    useEffect(() => {
        if (
            previousPanelsLength.current===undefined ||
            previousPanelsLength.current < panels.length
        ) {
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
    }, [panels, panelIndexCounter, delay]);

    return internalPanels;
};
