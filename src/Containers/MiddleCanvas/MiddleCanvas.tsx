import React, { useState, useEffect } from 'react';
import { DualSelectRadio } from './DualSelectRadio';
import { Template } from './Template';
import { DualSelectBar } from './DualSelectBar';
import { ITemplatePrefill, IPrinterOptions } from './MiddleCanvasTypes';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface MiddleCanvasProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    leftSelectOption: string;
    rightSelectOption: string;
    templatePrefills: ITemplatePrefill;
    printerOptions: IPrinterOptions;
    firstCaption?: string;
    secondCaption?: string;
}

export const MiddleCanvas: React.FC<MiddleCanvasProps> = ({
    leftSelectOption,
    rightSelectOption,
    templatePrefills,
    printerOptions,
    firstCaption,
    secondCaption,
    ...props
}): React.ReactElement => {
    const [selectedOption, setSelectedOption] = useState(leftSelectOption);
    const [isPreview, setIsPreview] = useState(false);

    useEffect((): void => {
        if (selectedOption === rightSelectOption) {
            setIsPreview(true);
        } else {
            setIsPreview(false);
        }
    }, [selectedOption]);

    return (
        <div {...props}>
            <DualSelectBar
                leftSelectOption={leftSelectOption}
                rightSelectOption={rightSelectOption}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <DualSelectRadio
                caption={firstCaption}
                dualSelectOptions={printerOptions}
            />
            <Template
                templatePrefills={templatePrefills}
                isPreview={isPreview}
            />
            <DualSelectRadio
                caption={secondCaption}
                dualSelectOptions={printerOptions}
            />
        </div>
    );
};
