import { StatusQuestionType } from "@/types";
import { IExample } from "@/types/question";
import { STATUS_QUESTION } from "@/utils/constants";

interface ContentQuestionProps {
    title: string;
    status: StatusQuestionType;
    description: string;
    examples: IExample[];
}

function ContentQuestion({
    title,
    status,
    description,
    examples,
}: ContentQuestionProps) {
    return (
        <div className="p-2">
            <div>
                <h1>{title}</h1>
                {status === STATUS_QUESTION.SOLVED && <span>Solved</span>}
            </div>
            <p>{description}</p>

            <ul>
                {examples.map(example => (
                    <li>
                        <p>
                            Input: <span>{example.input}</span>
                        </p>
                        <p>
                            Output: <span>{example.output}</span>
                        </p>
                        {example.explanation ? (
                            <p>
                                Output: <span>{example.output}</span>
                            </p>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContentQuestion;
