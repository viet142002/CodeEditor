import MainActions from "./MainActions";
import LeftActions from "./LeftActions";
import RightActions from "./RightActions";

function HeaderQuestion() {
    return (
        <header className='flex justify-between py-2'>
            <LeftActions />
            <MainActions />
            <RightActions />
        </header>
    );
}

export default HeaderQuestion;
