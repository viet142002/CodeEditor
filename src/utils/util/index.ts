import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T>(callback: (...props: any[]) => T, wait: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: unknown[]) => {
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T>(callback: (...props: any[]) => T, wait: number) => {
    let timerFlag: NodeJS.Timeout | null = null;
    return (...args: unknown[]) => {
        if (timerFlag === null) {
            callback(...args);
            timerFlag = setTimeout(() => {
                timerFlag = null;
            }, wait);
        }
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runUserCode(fnName: string, code: string, inputs: any[]) {
    const userFunc = new Function(
        ...Object.keys(inputs),
        `
            ${code}
            return ${fnName}(...arguments);
        `
    );
    return userFunc(...Object.values(inputs));
}

export const generateDefaultFunc = (
    fnName: string,
    inputs?: string[],
    comment?: string
) => {
    return `${comment ? "/*" + comment + "*/" : ""}
function ${fnName}(${inputs?.join(", ")}) {
    
}`;
};
