import React, { useState, useEffect } from 'react';
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

    const onLocationFinderChange = (target: Record<string, string>): void => {
        onLocationChange(target.value);
        setLocationValue(target.value);
    };

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=21+merrittonia&types=address&key=AIzaSyAnZ1I81qFChNHTOfnjn2JiEurapRIb4Fc';

    useEffect(() => {
        fetch(proxyurl + url)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result);
            });
    }, []);

    console.log(data);

    return (
        <ComboBox
            label="LOCATION"
            placeholder={locationPlaceholder}
            onChange={({ target }: any): void => {
                onLocationFinderChange(target);
            }}
            value={locationValue}
        >
            {[
                <option value="a" key="a">
                    hi
                </option>,
                <option value="b" key="b">
                    congrats
                </option>,
            ]}
        </ComboBox>
    );
};

export default LocationFinder;
