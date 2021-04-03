import {useEffect,useRef} from 'react'
import H from "@here/maps-api-for-javascript"

interface ICenterMap{
    lat:number;
    lng:number;
}

export const useMap=(mapContainer:React.RefObject<HTMLDivElement>,apikey:string,center:ICenterMap,zoom:number):void=> {
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
}