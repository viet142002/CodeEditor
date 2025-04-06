import { Button } from "@/components/common";
import { cn } from "@/utils/util";
import { Fragment, ReactNode } from "react";
import {
    MdOutlineFullscreen,
    MdArrowBackIosNew,
    MdFullscreenExit,
} from "react-icons/md";

interface ITabItem {
    key: string;
    content: ReactNode;
}

interface HeaderSectionQuestionProps {
    tabActive?: string;
    isFulled?: boolean;
    isExpanded?: boolean;
    directExpand?: "top-bottom" | "bottom-top" | "left-right" | "right-left";
    onChangeTab?: (key: string) => void;
    onClickExpand?: (toggle: boolean) => void;
    onClickFullScreen?: (toggle: boolean) => void;
    tabs: ITabItem[];
}

function HeaderSectionQuestion({
    directExpand = "top-bottom",
    isExpanded,
    isFulled,
    tabs = [],
    tabActive,
    onChangeTab = () => {},
    onClickFullScreen = () => {},
    onClickExpand = () => {},
}: HeaderSectionQuestionProps) {
    return (
        <div className='relative flex justify-between items-center group p-2 bg-highlight rounded-t-md'>
            <div className='flex gap-2 items-center'>
                {tabs.map((tab, index) => (
                    <Fragment key={tab.key}>
                        {index !== 0 ? (
                            <div className='h-[16px] w-[2px] bg-content-primary/40' />
                        ) : null}
                        <Button
                            className={cn({
                                "text-sm p-0": true,
                                "opacity-60": tabActive
                                    ? tabActive !== tab.key
                                    : index !== 0,
                            })}
                            onClick={() => onChangeTab(tab.key)}
                            variant='ghost'
                            size='fit'
                        >
                            {tab.content}
                        </Button>
                    </Fragment>
                ))}
            </div>
            <div className='absolute right-2 flex group-hover:opacity-100 opacity-0 duration-300 gap-1'>
                <Button size='fit' onClick={() => onClickFullScreen(!isFulled)}>
                    {isFulled ? <MdFullscreenExit /> : <MdOutlineFullscreen />}
                </Button>
                {isFulled ? null : (
                    <Button
                        size='fit'
                        onClick={() => onClickExpand(!isExpanded)}
                    >
                        <span
                            className={cn({
                                "rotate-180": isExpanded,
                            })}
                        >
                            <MdArrowBackIosNew
                                className={cn({
                                    "rotate-90": directExpand === "top-bottom",
                                    "-rotate-90": directExpand === "bottom-top",
                                    "rotate-180": directExpand === "right-left",
                                })}
                            />
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
}

interface ITab {
    icon: ReactNode
    content: ReactNode
}
HeaderSectionQuestion.Tab = ({ icon, content }: ITab) => {
    return <span className="flex gap-1 items-center">
        {icon} {content}
    </span>
}

export default HeaderSectionQuestion;