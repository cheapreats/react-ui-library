import {useState,useCallback,useEffect} from 'react'
import { useMounted } from '@Utils/Hooks';
import {OperationState} from '../PanelCard/PanelCard';
// @ts-ignore
import worker from 'workerize-loader!./worker'; // eslint-disable-line

const NO_BASE64STRINGFILE = 'NO_BASE64STRINGFILE';

interface IPanel {
    /** whether it's loading file, is completed, is failure */
    operationState: OperationState;
    /** name of file associated with the informative panel */
    name: string;
    /** worker; will do the job of reading the file */
    worker: Worker | null;
    /** the file associated with the informative panel */
    file: File | null;
}

interface IInformativePanels {
    /** array of panels */
    panels: IPanel[];
    /** names of files already uploaded, or failed, or cancelled */
    makeItDisappear: string[];
    /** names of files for which we want to start workers */
    startWorkers: string[];
}

export const useInformativePanels = (
    isTestIsFailure: boolean,
    onFile: (base64StringFile: string) => void,
    messageDuration: number,
): readonly [
    IPanel[],
    (acceptedFiles: File[]) => void,
    (name: string) => () => void,
] => {
    const isMounted = useMounted();
    const [informativePanels, setInformativePanels] =
        useState<IInformativePanels>({
            panels: [],
            makeItDisappear: [],
            startWorkers: [],
        });

    /**
     * set end state
     */
    const prepareForEndInformativePanel = useCallback(
        (operationState: OperationState, informativePanel: IPanel): void => {
            setInformativePanels((prev) => ({
                ...prev,
                panels: prev.panels.map((panel) => {
                    const {name}=panel;
                    if (name === informativePanel.name)
                        return {
                            ...panel,
                            operationState,
                        };
                    return panel;
                }),
                makeItDisappear: [
                    ...prev.makeItDisappear,
                    informativePanel.name,
                ],
            }));
        },
        [],
    );

    /**
     * terminate worker and set state of informative panel to success or failure and
     * send order to remove informative panel in the future. also do whatever user
     * wants to do with the file read in case of success
     */
    const onWorkerMessage = useCallback(
        (e: any) => {
            const { base64StringFile, name } = e.data;
            if (base64StringFile === undefined) {
                return;
            }
            const informativePanel = informativePanels.panels.find(
                (panel) => panel.name === name,
            );
            if (informativePanel) {
                let operationState:OperationState=OperationState.isUnknown;
                if (
                    base64StringFile === NO_BASE64STRINGFILE ||
                    isTestIsFailure
                ) {
                    operationState=OperationState.isFailure;
                } else {
                    onFile(base64StringFile);
                    operationState=OperationState.isSuccess;
                }
                prepareForEndInformativePanel(operationState,informativePanel);
            }
        },
        [
            informativePanels.panels,
            isTestIsFailure,
            onFile,
            prepareForEndInformativePanel,
        ],
    );

    // start workers after files have been droped and array of informative panels
    // are loaded
    useEffect(() => {
        if (informativePanels.startWorkers.length) {
            informativePanels.startWorkers.forEach((name) => {
                const informativePanel = informativePanels.panels.find(
                    (panel) => panel.name === name,
                );
                if (informativePanel && informativePanel.worker) {
                    const {worker:informativePanelWorker}=informativePanel;
                    informativePanelWorker.onmessage = onWorkerMessage;
                    informativePanelWorker.postMessage({
                        file: informativePanel.file,
                    });
                }
            });
            setInformativePanels((prev) => ({
                ...prev,
                startWorkers: [],
            }));
        }
    }, [informativePanels.startWorkers.length]);

    // make disappear informative panels in the future
    useEffect(() => {
        if (informativePanels.makeItDisappear.length) {
            informativePanels.makeItDisappear.forEach((name) => {
                setTimeout(() => {
                    if (isMounted.current) {
                        setInformativePanels((prev) => ({
                            ...prev,
                            panels: prev.panels.filter((panel) => {
                                const {name:fileName}=panel;
                                if (fileName === name) {
                                    const {worker:panelWorker}=panel;
                                    panelWorker?.terminate();
                                    return false;
                                }
                                return true;
                            }),
                            makeItDisappear: prev.makeItDisappear.filter(
                                (name_) => name_ !== name,
                            ),
                        }));
                    }
                }, messageDuration);
            });
        }
    }, [informativePanels.makeItDisappear.length]);

    // terminate workers on clean up function
    useEffect(
        () => () => {
            if (!isMounted.current) {
                informativePanels.panels.forEach((panel) =>
                    panel.worker?.terminate(),
                );
            }
        },
        [informativePanels.panels],
    );

    /**
     * load array of informative panels and send order to start workers
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newInformativePanels = acceptedFiles.map((file) => {
            const workerInstance = worker();
            return {
                operationState: OperationState.isLoading,
                name: file.name,
                worker: workerInstance,
                file,
            };
        });
        const fileNames = acceptedFiles.map((file) => file.name);
        setInformativePanels((prev) => ({
            ...prev,
            panels: [...prev.panels, ...newInformativePanels],
            startWorkers: [...fileNames],
        }));
    }, []);

    const onCancelUploading = (name: string) => () => {
        setInformativePanels((prev) => ({
            ...prev,
            panels: prev.panels.filter((panel) => {
                const {name:fileName}=panel;
                if (fileName === name) {
                    const {worker:panelWorker}=panel;
                    panelWorker?.terminate();
                    return false;
                }
                return true;
            }),
        }));
    };

    return [informativePanels.panels, onDrop, onCancelUploading] as const;
};
