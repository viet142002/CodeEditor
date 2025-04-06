import { useEffect, useState } from "react";

import { MdCheckBox } from "react-icons/md";
import { VscDebugConsole } from "react-icons/vsc";

import HeaderSectionQuestion from "@/components/Header/HeaderSectionQuestion";
import ExceptionContent from "@/pages/Question/components/ExceptionContent";

import { EVENT_KEYS } from "@/utils/constants";
import { runUserCode } from "@/utils/util";
import { commonEvent } from "@/utils/util/eventEmitter";

interface ResultProps {
    fnName: string;
    inputs?: string[];
    code: string;
    isExpanded: boolean;
    isFulled: boolean;
    onClickExpand?: (toggle: boolean) => void;
    onClickFullScreen?: (toggle: boolean) => void;
}

const tabSections = [
    {
        key: "test_case",
        content: (
            <HeaderSectionQuestion.Tab
                icon={<MdCheckBox className='text-amber-500' size={16} />}
                content='Test case'
            />
        ),
    },
    {
        key: "result",
        content: (
            <HeaderSectionQuestion.Tab
                icon={<VscDebugConsole className='text-amber-500' size={16} />}
                content='Result'
            />
        ),
    },
];

function Result({
    fnName,
    code,
    inputs = [],
    isFulled,
    isExpanded,
    onClickFullScreen = () => {},
    onClickExpand = () => {},
}: ResultProps) {
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const event = commonEvent.subscribe(msg => {
            if (msg.type === EVENT_KEYS.RUN_CODE_QUEST) {
                try {
                    const res = runUserCode(fnName, code, inputs);
                    setResult(res);
                } catch (error) {
                    setError((error as { message: string }).message);
                }
            }
        });
        return () => {
            event.unsubscribe();
        };
    }, [code, fnName, inputs]);

    return (
        <section>
            <HeaderSectionQuestion
                tabActive='test_case'
                tabs={tabSections}
                isFulled={isFulled}
                isExpanded={isExpanded}
                directExpand='top-bottom'
                onClickExpand={onClickExpand}
                onClickFullScreen={onClickFullScreen}
            />
            <div className='p-2'>
                {error ? (
                    <ExceptionContent>{error}</ExceptionContent>
                ) : (
                    <div>{result}</div>
                )}
            </div>
        </section>
    );
}

export default Result;
