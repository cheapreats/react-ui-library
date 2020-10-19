import React, { useState }  from 'react';
import { CheckList, RecInfoArr, ReqInfoArr } from './Checklist'
import { ModifierTools } from './ModifierTools'
import { List } from '../List';
import { Header } from './Header'

export interface RightSideBarProps {
    onCheckList: true,
}

const isToggleable = false;
const isLeftToggle = false;


export const RightSideBar: React.FC<RightSideBarProps> = ({
    onCheckList
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
        {onCheckList ? 
            <>
                <Header
                    modTitle='Modifier Tools'
                    checkTitle='CheckList'
                    isGray={true}
                />
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
                <Header
                    modTitle='Modifier Tools'
                    checkTitle='CheckList'
                    isGray={false}
                />
                <ModifierTools
                    title='Edit Layout'
                    isChosen={true}
                    isText={false}
                />
            </>
        }
        </List>
    );
};

