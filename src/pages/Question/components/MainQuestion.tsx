import { memo, useState } from "react";
import { motion } from "framer-motion";
import { MdArticle, MdHistory, MdMenuBook } from "react-icons/md";

import HeaderSectionQuestion from "@/components/Header/HeaderSectionQuestion";
import ContentQuestion from "@/pages/Question/components/ContentQuestion";
import CodeAndResult from "@/pages/Question/components/CodeAndResult";
import { cn } from "@/utils/util";
import { IQuestion } from "@/types";

interface MainQuestionProps {
    question: IQuestion;
}

const keys = {
    description: "description",
    solution: "solution",
    submission: "submission",
};

const tabSectionQuestion = [
    {
        key: keys.description,
        content: (
            <HeaderSectionQuestion.Tab
                icon={<MdArticle className='text-amber-500' size={16} />}
                content='Description'
            />
        ),
    },
    {
        key: keys.solution,
        content: (
            <HeaderSectionQuestion.Tab
                icon={<MdMenuBook className='text-amber-500' size={16} />}
                content='Description'
            />
        ),
    },
    {
        key: keys.submission,
        content: (
            <HeaderSectionQuestion.Tab
                icon={<MdHistory className='text-amber-500' size={16} />}
                content='Description'
            />
        ),
    },
];

function MainQuestion({ question }: MainQuestionProps) {
    const [expand, setExpand] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [tabActive, setTabActive] = useState('description');

    return (
        <div className='flex gap-2 h-full relative'>
            <motion.div
                layout
                className={cn({
                    "flex-1 bg-secondary rounded-md overflow-hidden": true,
                    "flex-[4]": expand,
                    "absolute inset-0 z-10": fullScreen,
                })}
            >
                <HeaderSectionQuestion
                    tabActive={tabActive}
                    tabs={tabSectionQuestion}
                    directExpand='right-left'
                    isExpanded={expand}
                    isFulled={fullScreen}
                    onChangeTab={(tab) => setTabActive(tab)}
                    onClickExpand={val => setExpand(val)}
                    onClickFullScreen={val => setFullScreen(val)}
                />
                <TabsRender question={question} tabActive={tabActive} />
            </motion.div>
            <motion.div layout className='flex-[2]'>
                <CodeAndResult codeData={question.code} />
            </motion.div>
        </div>
    );
}

interface ITabRender {
    question: IQuestion;
    tabActive: string;
}

const TabsRender = memo(({ question, tabActive }: ITabRender) => {
    if (keys.description === tabActive) {
        return (
            <ContentQuestion
                description={question.content.description}
                status={question.content.status}
                title={question.content.title}
                examples={question.content.examples}
            />
        );
    } else if (keys.solution === tabActive) {
        return 'solution';
    } else if (keys.submission === tabActive) {
        return 'submission';
    }
    return null;
});

export default MainQuestion;
