import React, { useState } from "react";
import { Heading, Paragraph } from "../../Text";
import { Modal } from "..";
import {Button} from '../../Inputs';

export interface IDeviceDiagnostics {
    operatingSystem: string,
    batteryLevel: number,
    isCharging: boolean,
    platform: string,
    vendor: string,
    userAgent: string,
    appVersion: string,
    closeButtonLabel: string,
    isModalOpen: boolean,
}

export const DeviceDiagnostics: React.FC<IDeviceDiagnostics> = ({
    operatingSystem,
    batteryLevel,
    isCharging,
    platform,
    vendor,
    userAgent,
    appVersion,
    closeButtonLabel = 'Close',
    isModalOpen,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(isModalOpen);
    const toggleModalVisibility = () => setIsOpen((isOpenPrev) => !isOpenPrev);


    return (
        <Modal
            padding="25px 35px"
            state={[isOpen, setIsOpen]}
            data-cy="hiddenInformationModalDiv"
            {...props}
        >
            <Heading
                type="h3"
                margin="0 0 10px"
                bold
            >Additional Info</Heading>
            <Paragraph margin="0 0 7px" bold>
                OS: {operatingSystem}
            </Paragraph>
            <Paragraph margin="0 0 7px" bold>
                Battery:{' '}
                {batteryLevel.toLocaleString(undefined, {
                    style: 'percent',
                })}
            </Paragraph>
            <Paragraph margin="0 0 7px" bold>
                Is Device Charging: {isCharging.toString()}
            </Paragraph>
            <Paragraph margin="0 0 7px" bold>
                Platform: {platform}
            </Paragraph>
            <Paragraph margin="0 0 7px" bold>
                Vendor: {vendor}
            </Paragraph>
            <Paragraph margin="0 0 7px" bold>
                User Agent: {userAgent}
            </Paragraph>
            <Paragraph margin="0 0 10px" bold>
                App Version: {appVersion}
            </Paragraph>
            <Button
                onClick={toggleModalVisibility}
                data-cy="closeHiddenInformationModalButton"
            >{closeButtonLabel}</Button>
        </Modal>
    )
}
