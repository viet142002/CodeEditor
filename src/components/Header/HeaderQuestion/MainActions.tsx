import { Button } from "@/components/common";
import { EVENT_KEYS } from "@/utils/constants";
import { throttle } from "@/utils/util";
import { commonEvent } from "@/utils/util/eventEmitter";
import { FaPlay, FaCloudUploadAlt } from "react-icons/fa";

function MainActions() {
    const handleEmitRunCode = throttle(() => {
        commonEvent.emit({
            type: EVENT_KEYS.RUN_CODE_QUEST
        })
    }, 1000)

    return (
        <div className="flex items-center gap-2">
            <Button size='sm' onClick={handleEmitRunCode}>
                <FaPlay size={14} /> Run
            </Button>
            <Button size='sm'>
                <FaCloudUploadAlt size={14} /> Upload
            </Button>
        </div>
    );
}

export default MainActions;
