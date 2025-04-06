import { useMemo } from "react";
import { useParams } from "react-router";

import questions from "@/assets/questions.json";
import MainQuestion from "@/pages/Question/components/MainQuestion";
import { IQuestion } from "@/types";
import HeaderQuestion from "@/components/Header/HeaderQuestion";

function QuestionPage() {
    const { slug } = useParams();

    const question = useMemo(() => {
        return questions.find(q => q.slug === slug) as unknown as IQuestion;
    }, [slug]);

    if (!question) {
        return <>
            <h2 className="">Question is not found</h2>
        </>
    }

    return (
        <div className='w-svw h-svh flex flex-col overflow-hidden'>
            <HeaderQuestion />
            <div className='flex-1 px-4 pb-4'>
                <MainQuestion question={question} />
            </div>
        </div>
    );
}

export default QuestionPage;
