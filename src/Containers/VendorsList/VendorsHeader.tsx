import React from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Button } from '../../Inputs/Button';
import { Heading } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface VendorsHeaderProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headerName: string;
    buttonName: string;
    icon: StyledIcon;
    buttonIcon?: StyledIcon;
    rowStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    onAddButtonClick?: () => void;
    onImportButtonClick?: () => void;
}

export const VendorsHeader: React.FC<VendorsHeaderProps> = ({
    headerName,
    buttonName,
    icon,
    buttonIcon,
    rowStyle,
    buttonStyle,
    onImportButtonClick,
    onAddButtonClick,
    ...props
}): React.ReactElement => {
    return (
        <div {...props}>
            <Heading type="h1" bold>
                {headerName}
            </Heading>
            <div style={{ ...rowStyle }}>
                <Button
                    icon={icon}
                    onClick={onImportButtonClick}
                    style={{ ...buttonStyle }}
                />
                <Button 
                    icon={buttonIcon} 
                    onClick={onAddButtonClick} 
                    primary
                >
                    {buttonName}
                </Button>
            </div>
        </div>
    );
};