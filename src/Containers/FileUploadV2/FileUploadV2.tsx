import React, { useState, useCallback, useEffect,useRef } from 'react';
import styled from 'styled-components';
// @ts-ignore
import worker from 'workerize-loader!./worker'; // eslint-disable-line
import { useMounted } from '@Utils/Hooks';
import { MainInterface, Main } from '@Utils/BaseStyles';
import {Button} from '@Inputs/Button/Button';
import { PanelCard,OperationState } from '../PanelCard/PanelCard';
import {DropArea,IDropAreaProps} from '../DropArea/DropArea';

// TODO: Add animations if possible (height transitions of the container component (expansion-contraction))
// and fade-in, fade-out effect of the informative panels.

const MESSAGE_DURATION = 1500;
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

export interface IFileUploadV2Props
    extends MainInterface,
        React.HTMLAttributes<HTMLDivElement> {
    /** if true, failure message will appear even after success operation; its purpose is to test the appearance of the failure message during development */
    isTestIsFailure?: boolean;
    /**
     * function to process the file read and transformed to a base64 string; default: does nothing
     * @param {string} base64String the file read and transformed to a base64 string
     */
    onFile?: (base64String: string) => void;
    /** time in ms of the presence of the bottom panel informing the result of the operation (sucess or failure); default value: 1500  */
    messageDuration?: number;
    dropAreaProps?:IDropAreaProps;
}
/**
 * multiple file upload, in parallel, version 2
 */
export const FileUploadV2: React.FC<IFileUploadV2Props> = ({
    isTestIsFailure = false,
    onFile = (base64String: string) => null,
    messageDuration = MESSAGE_DURATION,
    dropAreaProps={},
    ...props
}): React.ReactElement => {
    const isMounted = useMounted();
    const [informativePanels, setInformativePanels] =
        useState<IInformativePanels>({
            panels: [],
            makeItDisappear: [],
            startWorkers: [],
        });
    const [dropAreaWidth, setDropAreaWidth] = useState<number|undefined>();
    const dropAreaRef=useRef<HTMLDivElement>(null);

    /**
     * set end state
     */
    const prepareForEndInformativePanel = useCallback(
        (operationState: OperationState, informativePanel: IPanel): void => {
            setInformativePanels((prev) => ({
                ...prev,
                panels: prev.panels.map((panel) => {
                    if (panel.name === informativePanel.name)
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
                if (
                    base64StringFile === NO_BASE64STRINGFILE ||
                    isTestIsFailure
                ) {
                    prepareForEndInformativePanel(
                        OperationState.isFailure,
                        informativePanel,
                    );
                } else {
                    onFile(base64StringFile);
                    prepareForEndInformativePanel(
                        OperationState.isSuccess,
                        informativePanel,
                    );
                }
            }
        },
        [
            informativePanels.panels,
            isTestIsFailure,
            onFile,
            prepareForEndInformativePanel,
        ],
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

    // start workers after files have been droped and array of informative panels
    // are loaded
    useEffect(() => {
        if (informativePanels.startWorkers.length) {
            informativePanels.startWorkers.forEach((name) => {
                const informativePanel = informativePanels.panels.find(
                    (panel) => panel.name === name,
                );
                if (informativePanel && informativePanel.worker) {
                    informativePanel.worker.onmessage = onWorkerMessage;
                    informativePanel.worker?.postMessage({
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
                                if (panel.name === name) {
                                    panel.worker?.terminate();
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

    const onCancelUploading = (name: string) => () => {
        setInformativePanels((prev) => ({
            ...prev,
            panels: prev.panels.filter((panel) => {
                if (panel.name === name) {
                    panel.worker?.terminate();
                    return false;
                }
                return true;
            }),
        }));
    };

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

    useEffect(()=>{
        if(dropAreaRef.current){
            setDropAreaWidth(dropAreaRef.current.getBoundingClientRect().width);
        }
    },[])

    return (
        <FileUploadV2Container {...props}>
            <DropArea onDropHandler={onDrop} {...dropAreaProps} ref={dropAreaRef} />
            {informativePanels.panels.map((panel) => (
                <PanelCard
                    key={panel.name}
                    cancelButtonOnLoading={<Button onClick={onCancelUploading(panel.name)}>Cancel</Button>}
                    name={panel.name}
                    operationState={panel.operationState}
                    margin="10px 0"
                    style={{width:dropAreaWidth,boxSizing:'border-box'}}
                />
            ))}
        </FileUploadV2Container>
    );
};

const FileUploadV2Container = styled.div<MainInterface>`
    background-color: ${({theme})=>theme.colors.background};
    border-radius: ${({theme})=>theme.dimensions.radius};
    width: fit-content;
    ${({theme,...props }): string => Main({ padding:theme.dimensions.padding.container,...props })}
`;
