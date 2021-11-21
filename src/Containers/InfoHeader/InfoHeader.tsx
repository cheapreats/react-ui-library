import React, { useState } from 'react';
import styled from 'styled-components';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';
import {Heading, HeadingProps} from '@Text';

const [isShown, setIsShown] = useState(false);

export interface InfoHeaderProps extends HeadingProps {
    /* Text that will be displayed to the left of the icon */ 
    infotext: String;
}

export const InfoHeader: React.FC<InfoHeaderProps>  = ({
    infotext,
    ...props
}): React.ReactElement => (
    <InfoHeaderText {...props}>
        {infotext}
        onMouseEnter={() => setIsShown(false)}
        onMouseLeave={() => setIsShown(true)}
        {isShown && (    
        <Icon />
        )}
    </InfoHeaderText>
);

const InfoHeaderText = styled(Heading)`
    text-align: left;
`; 

const Icon = styled(InfoCircleFill)`
    width: 20px;
    float: center;
    padding: 0 0 10px 20px;
`;

export default InfoHeader;