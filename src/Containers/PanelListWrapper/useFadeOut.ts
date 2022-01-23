import { useEffect, useState, useRef } from 'react';
import { IPanelCardProps } from '../PanelCard/PanelCard';

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
