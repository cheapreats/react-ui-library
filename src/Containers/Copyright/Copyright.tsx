import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { SmallText } from '@Text/SmallText';

interface CopyrightProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLParagraphElement> {
    margin: string;
    version: string | number;
}

export const Copyright: React.FC<CopyrightProps> = ({
    margin,
    version,
    ...props
}): React.ReactElement => {
    return (
        <SmallText color="secondary" margin={margin} bold {...props}>
            Copyright CheaprEats Incorporated 2018 - 
            {' '}
            {new Date().getFullYear()}
            ,
            Version 
            {' '}
            {version}
        </SmallText>
    );
};
