import React, { useState } from "react";
import { CashRegister } from '@styled-icons/fa-solid/CashRegister';
import { Edit } from '@styled-icons/fa-solid/Edit';
import styled from "styled-components";
import { Code } from '@styled-icons/fa-solid/Code';
import { Music } from '@styled-icons/fa-solid/Music';
import { AssistiveListeningSystems } from '@styled-icons/fa-solid/AssistiveListeningSystems';
import { Print } from '@styled-icons/fa-solid/Print';
import { Wifi } from '@styled-icons/fa-solid/Wifi';
import { Receipt } from '@styled-icons/fa-solid/Receipt';
import { Heading, Paragraph } from "../../Text";
import { Modal, SettingsCard } from "..";
import { Button, Select, Switch } from "../../Inputs";
import { Mixins } from "../../Utils";


export interface ITerminalInformation {
    header: string,
    onSoundMediaChange: () => void,
    defaultSoundMode: string,
    soundModeOptions: string[],
    onSoundRepeatChange: () => void,
    defaultRepeatMode: string,
    soundRepeatOptions: string[],
    onTerminalConfigurationPress: () => void,
    onPlaceTestOrderClick: () => void,
    onThemeToggle: () => void,
    isFetching: boolean,
    isPrinting: boolean,
    isDiagnosticsModelOpen: boolean,
    isConfigurationModelOpen: boolean
    onTestPointOfSaleVolume: () => void,
    onTestPrinterConnection: () => void,
    onTestPrinterSound: () => void,
    onTestPrinterReceipt: () => void,
    onDiagnosticModalClose: () => void
}


export const TerminalInformation: React.FC<ITerminalInformation> = ({
    header,
    onSoundMediaChange,
    defaultSoundMode,
    soundModeOptions,
    onSoundRepeatChange,
    defaultRepeatMode,
    soundRepeatOptions,
    onTerminalConfigurationPress,
    onThemeToggle,
    onPlaceTestOrderClick,
    isConfigurationModelOpen,
    isDiagnosticsModelOpen,
    isPrinting,
    isFetching,
    onTestPointOfSaleVolume,
    onTestPrinterConnection,
    onTestPrinterSound,
    onTestPrinterReceipt,
    onDiagnosticModalClose,
    ...props
}) => {
    const [isConfigurationOpen, setIsConfigurationOpen] = useState(isConfigurationModelOpen);
    const toggleConfigurationModalVisibility = () => setIsConfigurationOpen((isConfigurationOpenPrev: boolean) => !isConfigurationOpenPrev);

    const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(isDiagnosticsModelOpen);
    const toggleDiagnosticsModalVisibility = () => setIsDiagnosticsOpen((isDiagnosticsOpenPrev: boolean) => !isDiagnosticsOpenPrev);

    return (
        <SettingsCard
            heading={header}
            icon={CashRegister}
            id="terminal-info"
            data-cy="terminalInformationDiv"
            {...props}
        >
            <Select
                description="New Order Sound Notification Settings"
                label="Sound Notification Settings"
                margin="2px 0 auto"
                onChange={onSoundMediaChange}
                value={defaultSoundMode}
                data-cy="soundNotificationSettingsLabelButton"
            >
                {soundModeOptions.map((mode) => (
                    <option key={mode} value={mode} data-cy={`${mode  }Option`}>
                        {mode.charAt(0) + mode.slice(1).toLowerCase()}
                    </option>
                ))}
            </Select>
            <Select
                description="Sound Type"
                margin="10px 0 auto 0"
                onChange={onSoundRepeatChange}
                value={defaultRepeatMode}
                data-cy="soundNotificationSettingsTypeButton"
            >
                {soundRepeatOptions.map((audio) => (
                    <option
                        key={audio}
                        value={audio}
                        data-cy={`${audio  }Option`}
                    >
                        {audio}
                    </option>
                ))}
            </Select>
            <ConfigurationButton
                icon={Edit}
                onClick={onTerminalConfigurationPress}
                data-cy="openTerminalInfoConfigModal"
            >
                Configuration
            </ConfigurationButton>
            <ConfigurationModel state={[isConfigurationOpen, setIsConfigurationOpen]} width="small">
                <ConfigurationHeader type="h3">
                    Configuration
                </ConfigurationHeader>
                <Switch
                    label="Dark Mode"
                    isChecked={JSON.parse(
                        localStorage.getItem('isDark') ?? 'false',
                    )}
                    onChange={onThemeToggle}
                    data-cy="changeTerminalConfigModeSwitch"
                />
                <Button
                    margin="10px 0"
                    onClick={toggleConfigurationModalVisibility}
                    data-cy="closeTerminalInfoConfigModal"
                >Close</Button>
            </ConfigurationModel>
            <Button
                onClick={toggleDiagnosticsModalVisibility}
                margin="5px 0 0"
                icon={Code}
                id="btn-diagnostics"
                data-cy="openTerminalInfoDiagnosticsModal"
            >
                Diagnostics
            </Button>
            <Modal
                padding="25px 35px"
                state={[isDiagnosticsOpen, setIsDiagnosticsOpen]}
                width="small"
                onClose={onDiagnosticModalClose}
                data-cy="terminalInfoDiagnosticsModalDiv"
            >
                <DiagnosticHeader type="h3">
                    Diagnostic Tools
                </DiagnosticHeader>
                <Buttons>
                    <Button
                        onClick={onTestPointOfSaleVolume}
                        icon={Music}
                        margin="5px"
                        id="btn-test-sound"
                        data-cy="testSoundNotificationButton"
                    >
                        Test Terminal Volume
                    </Button>
                    <Button
                        onClick={onTestPrinterSound}
                        icon={AssistiveListeningSystems}
                        margin="5px"
                        loading={isPrinting}
                    >
                        Test Printer Sound
                    </Button>
                    <Button
                        onClick={onTestPrinterConnection}
                        icon={Wifi}
                        margin="5px"
                        loading={isPrinting}
                    >
                        Test Printer Connection
                    </Button>
                    <Button
                        onClick={onTestPrinterReceipt}
                        icon={Print}
                        margin="5px"
                        loading={isPrinting}
                    >
                        Test Print A Receipt
                    </Button>
                    <Button
                        onClick={onPlaceTestOrderClick}
                        icon={Receipt}
                        margin="5px"
                        loading={isFetching}
                        data-cy="placeATestOrderButton"
                    >
                        Place Test Order
                    </Button>
                    {Notification.permission !== 'granted' ? (
                        <NotificationStatus>Notifications are Disabled</NotificationStatus>
                    ) : (
                        <NotificationStatus>Notifications are Enabled</NotificationStatus>
                    )}
                    <CloseDiagnosticsButton
                        onClick={toggleDiagnosticsModalVisibility}
                        id="btn-close"
                        data-cy="closeTerminalInfoDiagnosticsModal"
                    >
                        Close
                    </CloseDiagnosticsButton>
                </Buttons>
            </Modal>
        </SettingsCard>
    )}

const ConfigurationButton = styled(Button)`
    margin: 5px;
    text-decoration: none;
`;

const ConfigurationModel = styled(Modal)`
    padding: 25px 35px;
`;

const ConfigurationHeader = styled(Heading)`
    margin: 0 0 10px;
    font-weight: bold;
`;

const DiagnosticHeader = styled(Heading)`
    margin: 0 0 10px;
    font-weight: bold;
`;

const NotificationStatus = styled(Paragraph)`
    font-weight: bold;
    text-align: center;
`;

const CloseDiagnosticsButton = styled(Button)`
    margin: 5px;
`;

const Buttons = styled.div`
    ${Mixins.flex('column')};
    margin: -5px;
`;