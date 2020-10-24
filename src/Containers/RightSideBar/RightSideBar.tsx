import React, { useState }  from 'react';
import styled from 'styled-components';
import { CheckList, RecInfoArr, ReqInfoArr } from './Checklist'
import { ModifierTools } from './ModifierTools'
import { List } from '../List';
import { CheckListHeader, ModifierToolsHeader } from './Header'

export interface RightSideBarProps {
    isStandardChosen: boolean,
    isAlternativeChosen: boolean,
    onText: boolean,
    onImage: boolean,
}

const Wrapper = styled.div`
    text-align: center;
`;

const isToggleable = false;
const isLeftToggle = false;


export const RightSideBar: React.FC<RightSideBarProps> = ({
    isStandardChosen,
    isAlternativeChosen,
    onText,
    onImage,
}): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [isCheckList, setCheckList] = useState(true);

    return(
        <List
            id='right-sidebar'
            columnWidth = '387px'
            loading={loading}
            cssPosition='absolute'
            margin='0'
            left='auto'
            right='0'
            isToggleable={isToggleable}
            isLeftToggle={isLeftToggle}
            isToggled={isToggled}
            setIsToggled={setIsToggled}
        >
        <Wrapper>
            <CheckListHeader
                checkTitle='CheckList'
                isGray={isCheckList}
                onClick= {() => setCheckList(!isCheckList)}
            />
            <ModifierToolsHeader
                modTitle='Modifier Tools'
                isGray={isCheckList}
                onClick= {() => setCheckList(!isCheckList)}
            />
        </Wrapper>
        {isCheckList ? 
            <>
                <CheckList
                    title='Checklist'
                    CRATitle='Canada Revenue Agency'
                    ReqTitle='Required Information'
                    RecTitle='Recommended Information'
                    ReqInfoArr={ReqInfoArr}
                    RecInfoArr={RecInfoArr}
                />
            </>
            :
            <>
                <ModifierTools
                    title='Edit Layout'
                    isStandardChosen={isStandardChosen}
                    isAlternativeChosen={isAlternativeChosen}
                    isText={onText}
                    isImage={onImage}
                />
            </>
        }
        </List>
    );
};

