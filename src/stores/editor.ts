import { LanguageEditorType } from "@/types";
import { create } from "zustand";

interface ICodeEditor {
    language: LanguageEditorType
    changeLanguageEditor: (lang: LanguageEditorType) => void

    exceptions: string[]
    setExceptions: (vals: string[]) => void
}

export const useCodeEditor = create<ICodeEditor>(set => ({
    language: 'JavaScript',
    changeLanguageEditor: (lang) => set(() => ({ language: lang })),

    exceptions: [],
    setExceptions: (vals) => set({ exceptions: vals })
}));
