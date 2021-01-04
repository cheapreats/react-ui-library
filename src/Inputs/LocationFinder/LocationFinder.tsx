import React, { useState, useCallback } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ComboBox } from '../ComboBox/ComboBox';

export interface LocationFinderProps extends MainInterface, ResponsiveInterface {
    locationPlaceholder?: string;
    onLocationChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationFinder: React.FC<LocationFinderProps> = ({
    locationPlaceholder,
    onLocationChange = (): void => undefined,
}): React.ReactElement => {
    const [data, setData] = useState([]);

    const makeRequest = async (address: string) => {
        const proxyurl = `https://cors-anywhere.herokuapp.com/`;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=address&components=country:ca&key=AIzaSyA77BC1uUzfkd1WdlCkvXCfuf8BmPpSliI
    `;
        try {
            const res = await fetch(proxyurl + url);
            const resJSON = await res.json();
            console.log(resJSON, 'json')
            setData(resJSON.predictions);
        } catch (error) {
            alert(`Error${error}`);
        }
    };

    const onLocationFinderChange = (input: string): void => {
        makeRequest(input);
    };
    
    const onLocationSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        onLocationChange(event);
    }

    const renderLocations = useCallback(() => {
        const locationsOptions = data.map(location => (
            <option value={location} key={location}>
                {location}
            </option>
        ))
        return locationsOptions;
    }, [data]);

    return (
        <div>
            <ComboBox
                label="LOCATION"
                placeholder={locationPlaceholder}
                onChange={onLocationSelect}
                handleInputChange={onLocationFinderChange} 
            >
                {renderLocations()}
            </ComboBox>
        </div>
    );
};

export default LocationFinder;
