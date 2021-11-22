import React, { useState } from 'react';
import styled from 'styled-components';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';
import {Heading, HeadingProps} from '@Text';

// 
/*
        onMouseEnter={() => setIsShown(false)}
        onMouseLeave={() => setIsShown(true)}
        {isShown && (  
                    )} 
             */
export interface InfoHeaderProps extends HeadingProps {
    /* Text that will be displayed to the left of the icon */ 
    infotext: String;
    
}

export const InfoHeader: React.FC<InfoHeaderProps>  = ({
    infotext,
    ...props
}): React.ReactElement => (
    <InfoHeaderText {...props}>
        {showIcon(infotext)}
    </InfoHeaderText>
);

/**
* This function takes in infotext and determines if the user is mousing over it 
* If the user is the funtion will return the icon as well  as the text 
* Otherwise just the text is shown 
* @param {String} text - The time remaining in minutes  
* @returns {InfoHeaderText} - The text and icon  
*/
const showIcon = (text:String) => {
    const [isShown, setIsShown] = useState(false);
    
    return (
        <InfoHeaderText
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          {text}
          {isShown && (
            <Icon />
        )}
        </InfoHeaderText>
    );
  }

const InfoHeaderText = styled(Heading)`
    text-align: left;
`; 

const Icon = styled(InfoCircleFill)`
    width: 20px;
    float: center;
    padding: 0 0 10px 20px;
`;

export default InfoHeader;