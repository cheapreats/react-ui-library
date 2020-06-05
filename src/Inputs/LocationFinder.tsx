import React, { useState } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ComboBox } from './ComboBox';

interface LocationFinderProps extends MainInterface, ResponsiveInterface {
    locationValue?: string | number;
    locationPlaceholder?: string;
    onLocationChange?: Function;
}

export const LocationFinder: React.FC<LocationFinderProps> = ({
    locationPlaceholder,
    onLocationChange = (): void => {},
}): React.ReactElement => {
    const [data, setData] = useState([]);
    const [locationValue, setLocationValue] = useState('');

    const makeRequest = async (address: string) => {
        const proxyurl = `https://cors-anywhere.herokuapp.com/`;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=address&components=country:ca&key=AIzaSyA77BC1uUzfkd1WdlCkvXCfuf8BmPpSliI
    `;
        try {
            const res = await fetch(proxyurl + url);
            const resJSON = await res.json();
            setData(resJSON.predictions);
        } catch (error) {
            alert(`Error${error}`);
        }
    };

    const onLocationFinderChange = (target: Record<string, string>): void => {
        onLocationChange(target);
        setLocationValue(target.value);
        makeRequest('mayfiel');
    };

    console.log(data);

    return (
        <div>
            <ComboBox
                label="LOCATION"
                placeholder={locationPlaceholder}
                onChange={onLocationFinderChange}
                value={locationValue}
            >
                {[
                    <option value="a" key="a">
                        merrittonia
                    </option>,
                    <option value="b" key="b">
                        congrats
                    </option>,
                ]}
            </ComboBox>
        </div>
    );
};

export default LocationFinder;
