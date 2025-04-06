import CodeEditor from "@/components/CodeEditor";
import { useEffect, useRef, useState } from "react";

interface EditorFitProps {
    value: string;
    onChange?: (val: string | undefined, event: unknown) => void;
    toggleChangeSize?: unknown
}

function EditorToFit({ value, onChange, toggleChangeSize }: EditorFitProps) {
    const ref = useRef<HTMLScriptElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;
        console.log('ticnh lai size');
        
        setSize({
            width : ref.current.clientWidth,
            height: ref.current.clientHeight,
        })
    }, [toggleChangeSize]);

    return (
        <section className='flex-1 relative w-full h-full' ref={ref}>
            <div className='absolute inset-0'>
                <CodeEditor
                    value={value}
                    onChange={onChange}
                    width={size.width}
                    height={size.height}
                />
            </div>
        </section>
    );
}

export default EditorToFit;
