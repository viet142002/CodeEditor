import { LANGUAGE_EDITOR, STATUS_QUESTION } from "@/utils/constants";

export type LanguageEditorType = typeof LANGUAGE_EDITOR[keyof typeof LANGUAGE_EDITOR]; 
export type StatusQuestionType = typeof STATUS_QUESTION[keyof typeof STATUS_QUESTION];