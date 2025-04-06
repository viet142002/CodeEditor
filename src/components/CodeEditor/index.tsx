import { debounce } from "@/utils/util";
import Editor from "@monaco-editor/react";
import { memo, useRef } from "react";

interface CodeEditorProps {
    value: string;
    onChange?: (val: string | undefined, event: unknown) => void;
    width?: number;
    height?: number;
}

function CodeEditor({
    value,
    onChange = () => {},
    height,
    width,
}: CodeEditorProps) {
    const handleEditorValidation = useRef(debounce((markers: { message: string }[]) => {
        markers.forEach(marker => console.log("onValidate:", marker.message));
    }, 500));
    return (
        <Editor
            theme='vs-dark'
            value={value}
            onChange={onChange}
            defaultLanguage='javascript'
            width={width}
            height={height}
            onValidate={handleEditorValidation.current}
        />
    );
}

export default memo(CodeEditor);
