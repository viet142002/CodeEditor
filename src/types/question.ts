import { StatusQuestionType } from "@/types/editor";

export interface IExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface IQuestion {
    id: number;
    slug: string;
    content: IContent;
    code: ICode;
    testCase: ITestCase[];
    testCaseHidden: ITestCase[];
}

export interface ITestCase {
    input: unknown,
    target: unknown
}

export interface ICode {
    fnName: string;
    inputs?: string[];
    comment?: string;
}

export interface IContent {
    title: string;
    status: StatusQuestionType;
    description: string;
    examples: IExample[];
}
