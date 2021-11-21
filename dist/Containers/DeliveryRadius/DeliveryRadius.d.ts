import React from 'react';
import 'rc-slider/assets/index.css';
export declare enum DistanceUnit {
    km = 1000,
    m = 1
}
interface ISliderProps {
    min: number;
    max: number;
}
interface IMapCoordinates {
    lat: number;
    lng: number;
}
export interface IDeliveryRadiusProps {
    title: string;
    description: string;
    componentWidth: number;
    leftMarkContent: string;
    rightMarkContent: string;
    sliderProps?: ISliderProps;
    sliderHandleStyle?: React.CSSProperties | undefined;
    sliderTrackStyle?: React.CSSProperties | undefined;
    sliderRailStyle?: React.CSSProperties | undefined;
    unit: DistanceUnit;
    mapCoordinates: IMapCoordinates;
    mapZoom: number;
}
export declare const DeliveryRadius: React.FC<IDeliveryRadiusProps>;
export {};
