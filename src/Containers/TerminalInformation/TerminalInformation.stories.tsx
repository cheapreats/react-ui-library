import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TerminalInformation, ITerminalInformation } from './TerminalInformation';



export default {
    title: 'Terminal/Settings/TerminalInformation',
    component: TerminalInformation,
    argTypes: {
        onTestPointOfSaleVolume: {action: 'onTestPointOfSaleVolume'},
        onTestPrinterConnection: {action: 'onTestPrinterConnection'},
        onTestPrinterSound: {action: 'onTestPrinterSound'},
        onTestPrinterReceipt: {action: 'onTestPrinterReceipt'},
        onDiagnosticModalClose: {action: 'onDiagnosticModalClose'},
        onTerminalConfigurationPress: {action: 'onTerminalConfigurationPress'},
        onPlaceTestOrderClick: {action: 'onPlaceTestOrderClick'},
        onThemeToggle: {action: 'onThemeToggle'},
        onSoundMediaChange: {action: 'onSoundMediaChange'},
        onSoundRepeatChange: {action: 'onSoundRepeatChange'},
    },
    args: {
        header: 'Terminal Information',
        defaultSoundMode: 'Boink',
        soundModeOptions: ['Boink', 'Beep'],
        defaultRepeatMode: 'Once',
        soundRepeatOptions: ['Repeat', 'Once'],
        isFetching: false,
        isPrinting: false,
        isDiagnosticsModelOpen: false,
        isConfigurationModelOpen: false
    },
} as Meta;

export const Basic: Story<ITerminalInformation> = (args) => (
    <TerminalInformation {...args}/>
);
