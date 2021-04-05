import React, { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
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
export const useMap = (mapContainer: React.RefObject<HTMLDivElement>, apikey: string, center: ICenterMap, zoom: number): MutableRefObject<H.Map | undefined> => {
    const mapInstance = useRef<H.Map>();
    const platform = useRef<H.service.Platform>();

    /**
     * this creates a new instance of a map, with the specified coordinates and zoom level
     */
    useLayoutEffect(() => {
        if (!platform.current)
            platform.current = new H.service.Platform({
                apikey,
            });

        if (!mapInstance.current && mapContainer.current?.clientWidth) {
            const defaultLayers = platform.current.createDefaultLayers();

            mapInstance.current = new H.Map(
                mapContainer.current,
                defaultLayers.vector.normal.map,
                {
                    center,
                    zoom,
                    pixelRatio: window.devicePixelRatio || 1,
                },
            );
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.dispose();
                mapInstance.current = undefined;
            }
        };
    }, [mapContainer.current, mapContainer.current?.clientWidth]);

    return mapInstance;
};

/**
 * puts a marker in a map in certain coordinates
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates on the map where to place the mark
 * @param element {React.ReactElement} - the rendered react element which is the mark
 * @returns {React.MutableRefObject<H.map.DomMarker | undefined>} a reference to the marker
 */
export const useMapMarker = (map: MutableRefObject<H.Map | undefined>, mapCoordinates: ICenterMap, element: React.ReactElement): React.MutableRefObject<H.map.DomMarker | undefined> => {
    const marker = useRef<H.map.DomMarker>();

    /**
     * this adds a marker to the map in the specified coordinates
     */
    useLayoutEffect(() => {
        if (map.current && !marker.current) {
            const icon = new H.map.DomIcon(renderToString(element));
            marker.current = new H.map.DomMarker(mapCoordinates, { icon, data: {} });
            map.current.addObject(marker.current);
            map.current.setCenter(mapCoordinates);
        }
        return () => {
            if (marker.current) {
                marker.current.dispose();
                marker.current = undefined;
            }
        };
    }, [mapCoordinates, map.current]);

    return marker;
};

/**
 * renders a circle in a map centered in some specified coordinates and with some specified radius
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates in the map of the center of the circle
 * @param value {number} - the radius of the circle
 * @param unit {number} - the number of meters of the unit used in value
 * @returns {React.MutableRefObject<H.map.Circle | undefined>} a reference to the circle
 */
export const useMapCircle = (map: MutableRefObject<H.Map | undefined>, mapCoordinates: ICenterMap, value: number, unit: number): React.MutableRefObject<H.map.Circle | undefined> => {
    const circle = useRef<H.map.Circle>();

    /**
     * this adds a circle to the map in the specified coordinates with the specified radius (parameter value)
     */
    useLayoutEffect(() => {
        if (map.current && !circle.current) {
            circle.current = new H.map.Circle(mapCoordinates, value * unit);
            map.current.addObject(circle.current);
        }
        return () => {
            if (circle.current) {
                circle.current.dispose();
                circle.current = undefined;
            }
        };
    }, [map.current, mapCoordinates, value, unit]);

    return circle;
};