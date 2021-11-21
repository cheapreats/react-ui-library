import React, { MutableRefObject } from 'react';
import H from '@here/maps-api-for-javascript';
interface ICenterMap {
    lat: number;
    lng: number;
}
/**
 * renders a map in a container div, based on a coordinates and a level of zoom. apikey for the sdk is needed.
 * @param mapContainer {React.RefObject<HTMLDivElement>} - the reference to the container div for the map
 * @param apikey {string} - the api key for the sdk
 * @param center {ICenterMap} - the map coordinates (its center)
 * @param zoom {number} - the level of zoom applied
 * @returns {MutableRefObject<H.Map | undefined>} a reference to the map instance created
 */
export declare const useMap: (mapContainer: React.RefObject<HTMLDivElement>, apikey: string, center: ICenterMap, zoom: number) => MutableRefObject<H.Map | undefined>;
/**
 * puts a marker in a map in certain coordinates
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates on the map where to place the mark
 * @param element {React.ReactElement} - the rendered react element which is the mark
 * @returns {React.MutableRefObject<H.map.DomMarker | undefined>} a reference to the marker
 */
export declare const useMapMarker: (map: MutableRefObject<H.Map | undefined>, mapCoordinates: ICenterMap, element: React.ReactElement) => React.MutableRefObject<H.map.DomMarker | undefined>;
/**
 * renders a circle in a map centered in some specified coordinates and with some specified radius
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates in the map of the center of the circle
 * @param value {number} - the radius of the circle
 * @param unit {number} - the number of meters of the unit used in value
 * @returns {React.MutableRefObject<H.map.Circle | undefined>} a reference to the circle
 */
export declare const useMapCircle: (map: MutableRefObject<H.Map | undefined>, mapCoordinates: ICenterMap, value: number, unit: number) => React.MutableRefObject<H.map.Circle | undefined>;
export {};
