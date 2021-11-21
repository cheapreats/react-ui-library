import { FormEvent, ReactElement } from 'react';
export interface IReportIssueProps {
    ReportDescription?: string;
    handleSubmit: (arg0: FormEvent, arg1: HTMLOptionElement, arg2: string) => void;
    options: Array<HTMLOptionElement>;
    loading?: boolean;
}
export declare const ReportIssue: ({ ReportDescription, handleSubmit, options, loading, }: IReportIssueProps) => ReactElement;
