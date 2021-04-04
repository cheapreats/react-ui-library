import React, {useEffect,useRef,MutableRefObject} from 'react'
import {renderToString} from 'react-dom/server';
import H from "@here/maps-api-for-javascript"

interface ICenterMap{
    lat:number;
    lng:number;
}

/**
 * renders a map in a container div, based on a coordinates and a level of zoom. apikey for the sdk is needed.
 * @param mapContainer {React.RefObject<HTMLDivElement>} - the reference to the container div for the map 
 * @param apikey {string} - the api key for the sdk
 * @param center {ICenterMap} - the map coordinates (its center)
 * @param zoom {number} - the level of zoom applied
 * @returns {MutableRefObject<H.Map | undefined>} a reference to the map instance created
 */
export const useMap=(mapContainer:React.RefObject<HTMLDivElement>,apikey:string,center:ICenterMap,zoom:number):MutableRefObject<H.Map | undefined>=> {
    const mapInstance=useRef<H.Map>()
    const platform=useRef<H.service.Platform>()
    
    useEffect(()=>{
        if(!platform.current)
            platform.current = new H.service.Platform({
                apikey
            })
    
        const defaultLayers = platform.current.createDefaultLayers();
    
        if(!mapInstance.current&&mapContainer.current?.clientWidth)
            mapInstance.current=new H.Map(
                mapContainer.current,
                defaultLayers.vector.normal.map,
                {
                    center,
                    zoom,
                    pixelRatio: window.devicePixelRatio || 1
                }
            )

        return ()=>{
            if(mapInstance.current) {
                mapInstance.current.dispose()
                mapInstance.current=undefined
            }
        }
    },[mapContainer.current,mapContainer.current?.clientWidth]) 

    return mapInstance
}

/**
 * puts a marker in a map in certain coordinates
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates on the map where to place the mark
 * @param element {React.ReactElement} - the rendered react element which is the mark
 */
export const useMapMarker=(map:MutableRefObject<H.Map | undefined>,mapCoordinates:ICenterMap,element:React.ReactElement):void=>{
    useEffect(()=>{
        if(map.current){
            const icon = new H.map.DomIcon(renderToString(element))
            const marker = new H.map.DomMarker(mapCoordinates, {icon,data:{}})
            map.current.addObject(marker);
            map.current.setCenter(mapCoordinates);
        }
    },[mapCoordinates,map.current])
}

/**
 * renders a circle in a map centered in some specified coordinates and with some specified radius
 * @param map {MutableRefObject<H.Map | undefined>} - the map instance reference
 * @param mapCoordinates {ICenterMap} - the coordinates in the map of the center of the circle
 * @param value {number} - the radius of the circle
 * @param unit {number} - the number of meters of the unit used in value
 */
export const useMapCircle=(map:MutableRefObject<H.Map | undefined>,mapCoordinates:ICenterMap,value:number,unit:number):void=>{
    useEffect(()=>{
        let circle:H.map.Circle
        if(map.current){
            // Instantiate a circle object (using the default style):
            circle = new H.map.Circle(mapCoordinates, value*unit);
            // Add the circle to the map:
            map.current.addObject(circle);
        }
        return ()=>{
            if(circle) circle.dispose()
        }
    },[map.current,mapCoordinates,value,unit])
}