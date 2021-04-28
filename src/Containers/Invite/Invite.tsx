import React     from 'react'; 
import Button from '@Inputs/Button/Button';
import Input from '@Inputs/Input/Input'; 
import Heading from '@Text/Heading';
import styled from 'styled-components';
import { flex, media } from '@Utils/Mixins'; 
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { Paragraph, SmallText } from '../../index';
import { Formik, useField, Field } from "formik";
import * as Yup from "yup";

export interface InviteProps { 
    title: string;
    heading: string;
    description: string;
    footer: string;
    buttonText: string;
    inviteArgs: {
        name: string;
        label: string;
        placeholder: string;
        type: string;
        subLabel?: string;
    }[]; 
}

interface InputFieldsProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}
interface OtherInfoProps {
    as?: string;
}

/**
 * @param  
 * @returns label & placeholder
 */
const IFields = ({ label, ...props }: InputFieldsProps) => { 
    const [field, meta] = useField(props);
    return (
    <>
    {meta.touched && meta.error ? <SmallText color="primary">{meta.error}</SmallText> : null}
    <FormGroup>
        <Label>{label}</Label>
        <IDiv>
            <IInput {...field} {...props} />
        </IDiv>
    </FormGroup>
    </>
    );
};

/**
 * @param
 * @returns label, sublabel & placeholder
 */
const OtherInfo = ({ label, subLabel, ...props }: OtherInfoProps extends InputFieldsProps) => { 
    const [field, meta] = useField(props);
    return (
        <>                 
            {meta.touched && meta.error ? ( <SmallText color="primary">{meta.error}</SmallText> ) : null}                
            <FormGroup>
                <Label>
                    {label}
                    <SubLabel>{subLabel}</SubLabel> 
                </Label> 
                <IDiv>
                    <IField {...field} {...props} />
                </IDiv>   
            </FormGroup>
        </>
    );
};

export const Invite: React.FC<InviteProps> = ({ 
    title,
    heading,
    description,
    footer,
    buttonText,
    inviteArgs,
}): React.ReactElement => {        

    /**
     * return all input fields (label & placeholder)
     */
    const getAllInputs = (): React.ReactElement[] => {
        return inviteArgs.map(
            (item, key): React.ReactElement => (
                ( item.type !== "textarea") ?
                <IFields 
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                /> :
                <OtherInfo 
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder} 
                    subLabel={item.subLabel}
                    as="textarea" 
                />
            )
        )
    }
     
    const InviteForm = () => {
        return (
            <Formik
                /** initiate values of all input fields */
                initialValues={{ 
                    firstName: "",
                    lastName: "",
                    email: "", 
                    website: "",
                    otherInfo: "" 
                }}
                /**
                 * required firstName, lastName & website
                 * validate and required email address
                 */
                validationSchema={Yup.object({
                    firstName: Yup.string().required("Required"),
                    lastName: Yup.string().required("Required"),
                    website: Yup.string().required("Required"),
                    email: Yup.string()
                      .email("Invalid email addresss`")
                      .required("Required")
                })}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {props => (
                <Form onSubmit={props.handleSubmit}>
                    {getAllInputs()}
                    <FormGroup> 
                        <IButton 
                            {...buttonText} 
                            type="submit"              
                        > 
                            {buttonText}
                            <IChevronRight />
                            <IArrowRight />
                        </IButton> 
                    </FormGroup>
                </Form>
                )}
            </Formik> 
        );
    };
    
    return ( 
        <Row>
            <Col>
                <Heading color="primary" type="h5" bold>{title}</Heading>
                <SHeading type="h1" bold>{heading}</SHeading>
                <Paragraph>{description}</Paragraph>
            </Col>
            <Col>  
                {InviteForm()}
                <FormFooter>
                    <SmallText>{footer}</SmallText>
                </FormFooter>
            </Col>
        </Row> 
    );
};
 
const Row = styled.div`
    margin-bottom: .6rem;
    ${flex('row')}
    ${media('phone', 'flex-direction: column;')}
`;
const Col = styled.div`
    flex: 1;
`;
const SHeading = styled(Heading)`
    ${media('phone', 'margin-bottom: 1rem; line-height: 2rem;')}
`;
const FormFooter = styled.div`
    padding: 1rem;
`; 
const Form = styled.form`
    padding: 1rem;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
    ${media('phone', 'margin-top: 1rem;')}
`;
const FormGroup= styled.div`
    margin-bottom: .6rem;
    ${flex('row')};
    &:last-child {
        ${flex('flex-end')};
        ${media('phone', 'align-items: flex-start;')};
    }
    ${media('phone', 'flex-direction: column;')};
`;
const Label = styled.div`
    flex: .75;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.input.default};
    ${media('phone', 'margin-bottom: .2rem;')};
`;
const SubLabel = styled.p`
    font-weight: 400;
    font-size: 14px;
    margin: 0px;
    color: ${({ theme }) => theme.colors.input.default};
`;
const IDiv = styled.div`
    flex: 1.25;
`;
const IChevronRight = styled(ChevronRight)` 
    width: 12px;
    margin-left: 5px;
    animation: SlideLeft .6s forwards;
    @keyframes SlideLeft {        
        0% {transform: translateX(5px);}
        100% {transform: translateX(0px);}
    }
`;
const IArrowRight = styled(ArrowRight)`
    display: none; 
    margin-left: 5px;
    animation: SlideRight .6s forwards;
    @keyframes SlideRight {        
        0% {width: 5px;}
        100% {width: 15px;}
    }
`;
const IInput = styled(Input)`
    border-radius: 5px;
`;
const IField = styled(Field)`
    min-height: 2.8rem;
    width: 100%;
    font-size: 0.85rem;
    font-weight: bold;
    box-sizing: border-box;
    line-height: 1.4;
    outline: none;
    border: none;
    resize: vertical;    
    padding: 12px 20px;
    border-radius: 5px;
`;

const IButton = styled(Button)`
    &:hover ${IChevronRight} {
        display: none;
    }
    &:hover ${IArrowRight} {
        display: inline-block;
        width: 15px;       
    }
`;