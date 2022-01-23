import { useEffect, useState, useRef } from 'react';
import { IPanelCardProps } from '../PanelCard/PanelCard';

/**
 * adds fading out capabilities to panels
 * @param panels {IPanelCardProps[]} - panels to be prepared for fade out capability
 * @returns {{panel:IPanelCardProps;isShown:boolean;}[]} tuple with panels fade out prepared and onEndAnimation function
 */
export const useFadeOut = (
    panels: IPanelCardProps[],
): readonly [
    {
        panel: IPanelCardProps;
        isShown: boolean;
    }[],
    () => void,
] => {
    const previousPanelsAmmount = useRef<number>();
    const [internalPanels, setInternalPanels] = useState(
        panels.map((panel) => ({ panel, isShown: true })),
    );

    useEffect(() => {
        if (
            previousPanelsAmmount.current === undefined ||
            previousPanelsAmmount.current > panels.length
        ) {
            // remove panels marking them as isShown false
            setInternalPanels((prev) =>
                prev.map((internalPanel) => {
                    if (
                        !panels.some(
                            (panel) => panel.name === internalPanel.panel.name,
                        )
                    ) {
                        return { ...internalPanel, isShown: false };
                    }
                    return internalPanel;
                }),
            );
        } else {
            // add internal panels
            const panelsToAdd = panels.filter(
                (panel) =>
                    !internalPanels.some(
                        (internalPanel) =>
                            internalPanel.panel.name === panel.name,
                    ),
            );
            setInternalPanels((prev) => [
                ...prev,
                ...panelsToAdd.map((panel) => ({ panel, isShown: true })),
            ]);
        }
        previousPanelsAmmount.current = panels.length;
    }, [panels]);

    const removePanelsIsShownIsFalse = () => {
        setInternalPanels((prev) =>
            prev.filter((fadeOutPanel) => fadeOutPanel.isShown),
        );
    };

    return [internalPanels, removePanelsIsShownIsFalse] as const;
};
