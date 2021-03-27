import React,{useCallback,useMemo} from 'react'
import styled from 'styled-components'
import { Mixins } from '../../Utils'
import {
    Main,
    MainInterface,
} from '../../Utils/BaseStyles';
import Theme from '../../Themes/ThemeTemplate'

const smallFontSize=Theme.font.size.small

interface IEntries{
    type:string;
    entry:IEntryProps|IHeadingEntryProps;
}

export interface INutritionFactProps{
    entries:IEntries[];
}

export const NutritionFact:React.FC<INutritionFactProps>=({entries}):React.ReactElement=>
{

    /**
     * renders an entry of type entry
     * @param entry {IEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderEntry=useCallback((entry:IEntryProps)=>{
        const {label,...rest}=entry
        return <Entry key={label} label={label} {...rest} margin='0 0 2px' padding='0 0 1px' />
    },[])

    /**
     * renders an entry of type heading
     * @param entry {IHeadingEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderHeadingEntry=useCallback((entry:IHeadingEntryProps)=>{
        const {label,...rest}=entry
        return <HeadingEntry key={label} label={label} {...rest} />
    }
    ,[])

    /**
     * renders the entries
     */
    const renderEntries=useCallback(()=>
        entries.map(({type,entry})=>{
            switch(type){
            case 'entry':
                return renderEntry(entry as IEntryProps)
            case 'heading':
                return renderHeadingEntry(entry as IHeadingEntryProps)
            default:
                return null
            }
        })
    ,[entries])

    return     (
        <MainContainer padding='5px'>
            {renderEntries()}
        </MainContainer>
    )
}

interface IMainContainerProps extends MainInterface{
    width?:number
}

const MainContainer=styled.div<IMainContainerProps>`
border:2px solid black;
${({width,...props}):string=>`
${width?`width:${width}px;`:'width:fit-content;'}
${Main({...props})}
`}
`

interface ICommonEntryProps{
    fontSize?:string;
    bold?:boolean;
    separatorWidth?:number;
    margin?:string;
    padding?:string;
}

interface IHeadingEntryProps extends ICommonEntryProps{
    label:string;
    justifyContent?:string;
    secondLabel?:string;
}

const HeadingEntry:React.FC<IHeadingEntryProps>=({label,fontSize=smallFontSize,separatorWidth=1,secondLabel,...props}):React.ReactElement=>(
    <EntryContainer separatorWidth={separatorWidth} fontSize={fontSize} {...props}>
        <div>{label}</div>
        {secondLabel&&<div>{secondLabel}</div>}
    </EntryContainer>
)

interface IEntryProps extends ICommonEntryProps{
    amount:number;
    dailyAmount:number;
    label:string;
    unity:string;
    indentationNumber?:number;
    indentationSize?:number;
}

const Entry:React.FC<IEntryProps>=({
    amount,
    dailyAmount,
    label,
    unity,
    fontSize=smallFontSize,
    bold=false,
    separatorWidth=1,
    indentationNumber=0,
    indentationSize=4,
    ...props
}):React.ReactElement=>{

    const dailyValue= useMemo(()=>{
        if(dailyAmount)
            return Math.round(amount/dailyAmount*100)
        return null
    },[amount,dailyAmount]);

    /**
     * computes the amount of white space
     * @returns {string} white space 
     */
    const renderIndentation=useCallback(()=>{
        let space=''
        const nbsp='\u00a0'
        for(let j=0;j<indentationNumber;j+=1){
            for(let i=0;i<indentationSize; i+=1) space+=nbsp
        }
        return space
    },[indentationNumber,indentationSize])

    return (
        <EntryContainer separatorWidth={separatorWidth} fontSize={fontSize} justifyContent='space-between' {...props}>
            <LabelContainer> 
                {renderIndentation()}
                <Bold bold={bold}>
                    {label}
                    &nbsp;
                </Bold>
                <div>
                    {amount}
                    {unity}
                </div>
            </LabelContainer>
            {dailyValue!==null&&(
                <Bold bold={bold}>
                    {dailyValue}
                    %
                </Bold>
            )}
        </EntryContainer>
    )
}

interface IEntryContainerProps extends MainInterface{
    fontSize:string;
    separatorWidth:number;
    justifyContent?:string;
    bold?:boolean;
}

const EntryContainer=styled.div<IEntryContainerProps>`
${({separatorWidth,fontSize,justifyContent='flex-start',bold=false,...props}):string=>`
${Mixins.flex(justifyContent)}
border-bottom:${separatorWidth}px solid black;
font-size:${fontSize};
${bold?'font-weight:700;':''}
${Main({...props})}
`}
`

const LabelContainer=styled.div`
${Mixins.flex()}
`

interface IBoldProps{
    bold?:boolean;
}

const Bold=styled.div<IBoldProps>`
${({bold}):string=>`
${bold?'font-weight:700;':''}
`}
`


