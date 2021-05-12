import React, { useState } from 'react';
import Button from '@Inputs/Button/Button';
import Input from '@Inputs/Input/Input';
import Heading from '@Text/Heading';
import styled from 'styled-components';
import { flex, media } from '@Utils/Mixins';
import { ChevronRight } from '@styled-icons/bootstrap/ChevronRight';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-cycle
import { Paragraph, SmallText } from '../../index';

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
    // eslint-disable-next-line react/require-default-props
    subLabel?: string;
    name: string;
    type: string;
    placeholder: string;
    // eslint-disable-next-line react/require-default-props
    as?: string;
}

/**
 * @param
 * @returns label, sublabel, input props & error message
 */
const IField = ({ label, subLabel, ...rest }: InputFieldsProps) => {
    const [field, meta] = useField(rest);
    return (
        <>
            {meta.touched && meta.error ? (
                <SmallText color="primary">{meta.error}</SmallText>
            ) : null}
            <FormGroup>
                <Label>
                    {label}
                    <SubLabel>{subLabel}</SubLabel>
                </Label>
                <IDiv>
                    <Input {...field} {...rest} />
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
     * @returns label, sublabel, name, type & placeholder
     */
    const getAllInputs = (): React.ReactElement[] =>
        inviteArgs.map(
            (item): React.ReactElement =>
                item.type !== 'textarea' ? (
                    <IField
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                    />
                ) : (
                    <IField
                        key={item.name}
                        label={item.label}
                        subLabel={item.subLabel}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        as="textarea"
                    />
                ),
        );

    const InviteForm = () => {
        const [formValues, setFormValues] = useState(null);
        const initialValues = {
            firstName: '',
            lastName: '',
            email: '',
            website: '',
            otherInfo: '',
        };
        const saveValues: any = {
            firstName: '',
            lastName: '',
            email: '',
            website: '',
            otherInfo: '',
        };

        /**
         * required firstName, lastName & website
         * validate and required email address
         */
        const validationSchema = Yup.object({
            firstName: Yup.string().required('required'),
            lastName: Yup.string().required('required'),
            website: Yup.string().required('Required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('required'),
        });

        /**
         * output values
         * @param values
         * @param submitForm
         */
        const onSubmit = (values: any, submitForm: any) => {
            alert(JSON.stringify(values, null, 2));
            submitForm.setSubmitting(false);
            submitForm.resetForm(false);
        };

        return (
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                        {getAllInputs()}
                        <FormGroup>
                            <IButton
                                {...buttonText}
                                type="submit"
                                onClick={() => setFormValues(saveValues)}
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
        <Wrapper>
            <Col>
                <Heading color="primary" type="h5" bold>
                    {title}
                </Heading>
                <SHeading type="h1" bold>
                    {heading}
                </SHeading>
                <Paragraph>{description}</Paragraph>
            </Col>
            <Col>
                {InviteForm()}
                <FormFooter>
                    <SmallText>{footer}</SmallText>
                </FormFooter>
            </Col>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-bottom: 0.6rem;
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
    background-color: ${({ theme }) =>
        theme.colors.occupancyStatusColors.Occupied};
    ${media('phone', 'margin-top: 1rem;')}
`;
const FormGroup = styled.div`
    margin-bottom: 0.6rem;
    ${flex('row')};
    &:last-child {
        ${flex('flex-end')};
        ${media('phone', 'align-items: flex-start;')};
    }
    ${media('phone', 'flex-direction: column;')};
`;
const Label = styled.div`
    flex: 0.75;
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
    animation: SlideLeft 0.6s forwards;
    @keyframes SlideLeft {
        0% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0px);
        }
    }
`;
const IArrowRight = styled(ArrowRight)`
    display: none;
    margin-left: 5px;
    animation: SlideRight 0.6s forwards;
    @keyframes SlideRight {
        0% {
            width: 5px;
        }
        100% {
            width: 15px;
        }
    }
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
