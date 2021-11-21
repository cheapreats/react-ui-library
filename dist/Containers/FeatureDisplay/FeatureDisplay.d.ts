import React from 'react';
export interface IFeatureDisplayProps {
    featureTitle: string;
    featureSubTitle: string;
    featureImage: string;
    imageTitle: string;
    imageTags: string[];
    imageTagColors: string[];
    highlightTexts: string[];
    featureFooter: string;
    linkHref?: string;
}
export declare const FeatureDisplay: React.FC<IFeatureDisplayProps>;
