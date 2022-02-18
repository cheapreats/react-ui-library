import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DeviceDiagnostics, IDeviceDiagnostics } from './DeviceDiagnostics';



export default {
    title: 'Terminal/Settings/DeviceDiagnostics',
    component: DeviceDiagnostics,
    argTypes: {
    },
    args: {
        operatingSystem: 'IOS',
        batteryLevel: 0.9,
        isCharging: true,
        platform: 'Android 2.6',
        vendor: 'Random',
        userAgent: 'Network',
        appVersion: '2.0.2',
        closeButtonLabel: 'Close',
        isModalOpen: true,
    },
} as Meta;

export const Basic: Story<IDeviceDiagnostics> = (args) => (
    <DeviceDiagnostics {...args}/>
);
