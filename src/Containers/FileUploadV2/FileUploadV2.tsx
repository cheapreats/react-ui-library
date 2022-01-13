import React, { useState, useCallback, useEffect,useRef } from 'react';
import styled from 'styled-components';
// @ts-ignore
import worker from 'workerize-loader!./worker'; // eslint-disable-line
import { useMounted } from '@Utils/Hooks';
import Dropzone, { useDropzone } from 'react-dropzone';
import {CardProps} from '../Card/Card';

// TODO: Add animations if possible (height transitions of the container component (expansion-contraction))
// and fade-in, fade-out effect of the informative panels.

const MESSAGE_DURATION = 1500;
const NO_BASE64STRINGFILE = 'NO_BASE64STRINGFILE';

export enum OperationState {
    isSuccess,
    isFailure,
    isLoading,
    isUnknown
}

export interface IPanelProps extends CardProps {
    operationState?: OperationState;
    /** the name of the file */
    name?: string;
    onCancelUploading?:()=>void;
}

interface IPanel {
    /** whether it's loading file, is completed, is failure */
    operationState:OperationState;
    /** name of file associated with the informative panel */
    name: string;
    /** worker; will do the job of reading the file */
    worker: Worker;
    /** the file associated with the informative panel */
    file: File;
}

interface IInformativePanels {
    /** array of panels */
    panels: IPanel[];
    /** names of files already uploaded, or failed, or cancelled */
    makeItDisappear: string[];
    /** names of files for which we want to start workers */
    startWorkers: string[];
}

export interface IDropAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    isDragEnter?: boolean;
}

export interface IFileUploadV2Props
    extends React.HTMLAttributes<HTMLDivElement> {
    /** whether or not the file upload component is disabled */
    isDisabled?: boolean;
    /** component to render the drop area */
    DropArea: React.FC<IDropAreaProps>;
    /** component to render the informative panel */
    Panel:React.FC<IPanelProps>;
    /** if true, failure message will appear even after success operation; its purpose is to test the appearance of the failure message during development */
    isTestIsFailure?: boolean;
    /**
     * function to process the file read and transformed to a base64 string; default: does nothing
     * @param {string} base64String the file read and transformed to a base64 string
     */
    processFile?: (base64String: string) => void;
    /** time in ms of the presence of the bottom panel informing the result of the operation (sucess or failure); default value: 1500  */
    messageDuration?: number;
}
/**
 * multiple file upload, in parallel, version 2
 */
export const FileUploadV2: React.FC<IFileUploadV2Props> = ({
    isDisabled = false,
    DropArea,
    Panel,
    isTestIsFailure = false,
    processFile = (base64String: string) => null,
    messageDuration = MESSAGE_DURATION,
    ...props
}): React.ReactElement => {
    const isMounted = useMounted();
    const [informativePanels, setInformativePanels] =
        useState<IInformativePanels>({
            panels: [],
            makeItDisappear: [],
            startWorkers: [],
        });
    const [isDragEnter, setIsDragEnter] = useState(false);
    const dropAreaRef=useRef<HTMLDivElement>(null);
    const [width,setWidth]=useState<number>(0);

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
                    setInformativePanels((prev) => ({
                        ...prev,
                        panels: prev.panels.map((panel) => {
                            if (panel.name === informativePanel.name)
                                return {
                                    ...panel,
                                    operationState:OperationState.isFailure
                                };
                            return panel;
                        }),
                        makeItDisappear: [
                            ...prev.makeItDisappear,
                            informativePanel.name,
                        ],
                    }));
                } else {
                    processFile(base64StringFile);
                    setInformativePanels((prev) => ({
                        ...prev,
                        panels: prev.panels.map((panel) => {
                            if (panel.name === informativePanel.name)
                                return {
                                    ...panel,
                                    operationState:OperationState.isSuccess
                                };
                            return panel;
                        }),
                        makeItDisappear: [
                            ...prev.makeItDisappear,
                            informativePanel.name,
                        ],
                    }));
                }
            }
        },
        [informativePanels.panels, isTestIsFailure, processFile],
    );

    const onDragEnter = () => {
        setIsDragEnter(true);
    };

    const onDragLeave = () => {
        setIsDragEnter(false);
    };

    /**
     * load array of informative panels and send order to start workers
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newInformativePanels = acceptedFiles.map((file) => {
            const workerInstance = worker();
            return {
                operationState:OperationState.isLoading,
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
        setIsDragEnter(false);
    }, []);

    // start workers after files have been droped and array of informative panels
    // are loaded
    useEffect(() => {
        if (informativePanels.startWorkers.length) {
            informativePanels.startWorkers.forEach((name) => {
                const informativePanel = informativePanels.panels.find(
                    (panel) => panel.name === name,
                );
                if (informativePanel) {
                    informativePanel.worker.onmessage = onWorkerMessage;
                    informativePanel.worker.postMessage({
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
                                    panel.worker.terminate();
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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter,
        onDragLeave,
        disabled: isDisabled,
    });

    const onCancelUploading = (name: string) => () => {
        setInformativePanels((prev) => ({
            ...prev,
            panels: prev.panels.filter((panel) => {
                if (panel.name === name) {
                    panel.worker.terminate();
                    return false;
                }
                return true;
            }),
        }));
    };

    // after first render, we compute width of the drop area component
    useEffect(()=>{
        if(dropAreaRef.current){
            setWidth(dropAreaRef.current.getBoundingClientRect().width)
        }
    },[])

    return (
        <FileUploadV2Container {...props}>
            <Dropzone multiple>
                {() => (
                    <div {...getRootProps()} ref={dropAreaRef}>
                        <DropArea isDragEnter={isDragEnter} />
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>
            {informativePanels.panels.map((panel) => (
                <Panel key={panel.name} name={panel.name} operationState={panel.operationState} onCancelUploading={onCancelUploading(panel.name)} margin='10px 0' style={{width}} />
            ))}
        </FileUploadV2Container>
    );
};

const FileUploadV2Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    width: fit-content;
`;
