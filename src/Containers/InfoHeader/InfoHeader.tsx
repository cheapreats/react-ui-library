import React, { useState } from 'react';
import styled from 'styled-components';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';
import {Heading, HeadingProps} from '@Text';

export interface InfoHeaderProps extends HeadingProps {
    /* Text that will be displayed to the left of the icon */ 
    infotext: String;
  /* Text that will be displayed underneath the infotext when icon is hovered over */ 
    tooltiptext: String;
    
}

export const InfoHeader: React.FC<InfoHeaderProps>  = ({
    infotext,
    tooltiptext,
    ...props
}): React.ReactElement => (
    <InfoHeaderText {...props}>
      {showIcon(infotext,tooltiptext)}
    </InfoHeaderText>
);

/**
* This function determines if the user is mousing over the icon
* If the user mousing over the icon, a tooltip is displayed 
* Otherwise just the text and icon is shown 
* @param {String} text - the infotext from main react element 
* @param {String} tooltip - the tooltip that will be displayed  
* @returns {InfoHeaderText} - The text, icon and a tootip 
*/
const showIcon = (text:String,tooltip:String) => {
    const [isShown, setIsShown] = useState(false);
    
    return (
        <InfoHeaderText
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          {text}
          <Icon />
          {isShown && (
        <ToolTipText>
          {tooltip}
        </ToolTipText>
      )}
        </InfoHeaderText>
    );
  }

const InfoHeaderText = styled(Heading)`
    text-align: left;
`; 

const ToolTipText = styled(Heading)`
    text-align: left;
    font-size: 65%;
`; 

const Icon = styled(InfoCircleFill)`
    width: 20px;
    float: center;
    padding: 0 0 10px 20px;
`;

export default InfoHeader;