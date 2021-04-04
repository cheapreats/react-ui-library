import React, {useEffect,useRef,MutableRefObject} from 'react'
import {renderToString} from 'react-dom/server';
import H from "@here/maps-api-for-javascript"

interface ICenterMap{
    lat:number;
    lng:number;
}

export const useMap=(mapContainer:React.RefObject<HTMLDivElement>,apikey:string,center:ICenterMap,zoom:number):MutableRefObject<H.Map | undefined>=> {
    const mapInstance=useRef<H.Map>()
    
    useEffect(()=>{
        const platform = new H.service.Platform({
            apikey
        });
    
        const defaultLayers = platform.createDefaultLayers();
    
        // Create an instance of the map
        mapInstance.current=new H.Map(
            mapContainer.current,
            defaultLayers.vector.normal.map,
            {
            // This map is centered over Europe
                center,
                zoom,
                pixelRatio: window.devicePixelRatio || 1
            }
        )

        return ()=>{
            // Cleanup after the map to avoid memory leaks when this component exits the page
            if(mapInstance.current) mapInstance.current.dispose()
        }
    },[]) 

    return mapInstance
}

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