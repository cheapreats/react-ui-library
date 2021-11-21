import React from 'react';
import { SwitchProps } from '../Switch/Switch';
export interface SettingsSwitchProps extends SwitchProps {
    text?: string;
    type?: string;
    onSwitch?: Function;
    onSwitchValue?: any;
    flexDirection?: string;
    height?: string;
    width?: string;
    margin?: string;
    innerMargin?: string;
}
export declare const SettingsSwitch: React.FC<SettingsSwitchProps>;
