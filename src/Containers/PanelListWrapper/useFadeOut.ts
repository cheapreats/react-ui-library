import { useEffect, useState } from 'react';
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
    const [internalPanels, setInternalPanels] = useState(
        panels.map((panel) => ({ panel, isShown: true })),
    );

    useEffect(() => {
        setInternalPanels((prev) => [
            ...prev.map((prevPanel) => {
                const foundPanel = panels.find(
                    (panel) => panel.name === prevPanel.panel.name,
                );
                if (foundPanel)
                    return { panel: foundPanel, isShown: prevPanel.isShown };
                return { ...prevPanel, isShown: false };
            }),
            ...panels
                .filter(
                    (panel) =>
                        !prev.some(
                            (prevPanel) => prevPanel.panel.name === panel.name,
                        ),
                )
                .map((panel) => ({ panel, isShown: true })),
        ]);
    }, [panels]);

    const removePanelsIsShownIsFalse = () => {
        setInternalPanels((prev) =>
            prev.filter((fadeOutPanel) => fadeOutPanel.isShown),
        );
    };

    return [internalPanels, removePanelsIsShownIsFalse] as const;
};
