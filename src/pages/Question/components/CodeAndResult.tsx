import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";

import HeaderSectionQuestion from "@/components/Header/HeaderSectionQuestion";
import Result from "@/pages/Question/components/Result";
import EditorToFit from "@/components/CodeEditor/EditorToFit";
import { cn, generateDefaultFunc } from "@/utils/util";
import { ICode } from "@/types";
import { MdCode } from "react-icons/md";

interface CodeAndResultProps {
    codeData: ICode;
}

function CodeAndResult({ codeData }: CodeAndResultProps) {
    const [code, setCode] = useState(() =>
        generateDefaultFunc(codeData.fnName, codeData.inputs, codeData.comment)
    );
    const [expand, setExpand] = useState({
        codeEditor: true,
        result: false,
    });
    const [fullScreen, setFullScreen] = useState({
        codeEditor: false,
        result: false,
    });

    const handleChange = useCallback(
        (val: string | undefined, event: unknown) => {
            if (!val || !event) return;
            setCode(val);
        },
        []
    );

    return (
        <div className='flex flex-col h-full gap-2'>
            <motion.div
                layout
                className={cn({
                    "flex flex-col flex-5 bg-secondary rounded-md overflow-hidden":
                        true,
                    "absolute inset-0 z-10": fullScreen.codeEditor,
                })}
                transition={{
                    default: { ease: "linear" },
                    layout: { duration: 0.3 },
                }}
            >
                <HeaderSectionQuestion
                    tabs={[
                        {
                            key: "code",
                            content: (
                                <HeaderSectionQuestion.Tab
                                    icon={
                                        <MdCode
                                            className='text-amber-500'
                                            size={20}
                                        />
                                    }
                                    content='Code'
                                />
                            ),
                        },
                    ]}
                    isExpanded={expand.codeEditor}
                    isFulled={fullScreen.codeEditor}
                    directExpand='bottom-top'
                    onClickExpand={val =>
                        setExpand({
                            codeEditor: val,
                            result: !val,
                        })
                    }
                    onClickFullScreen={val =>
                        setFullScreen({
                            codeEditor: val,
                            result: false,
                        })
                    }
                />
                <EditorToFit
                    value={code}
                    onChange={handleChange}
                    toggleChangeSize={
                        expand.codeEditor.toString() +
                        fullScreen.codeEditor.toString() +
                        ""
                    }
                />
            </motion.div>
            <motion.div
                layout
                className={cn({
                    "flex-[2] bg-secondary rounded-md overflow-hidden": true,
                    "flex-[10]": expand.result,
                    "absolute inset-0 z-10": fullScreen.result,
                })}
                transition={{
                    default: { ease: "linear" },
                    layout: { duration: 0.2 },
                }}
            >
                <Result
                    fnName={codeData.fnName}
                    code={code}
                    inputs={codeData.inputs}
                    isFulled={fullScreen.result}
                    isExpanded={expand.result}
                    onClickExpand={val =>
                        setExpand({
                            codeEditor: !val,
                            result: val,
                        })
                    }
                    onClickFullScreen={val =>
                        setFullScreen({
                            result: val,
                            codeEditor: false,
                        })
                    }
                />
            </motion.div>
        </div>
    );
}

export default memo(CodeAndResult);
