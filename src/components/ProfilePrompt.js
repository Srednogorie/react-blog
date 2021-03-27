import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";

function ProfilePrompt() {
    const g = useGlobalState();
    ProfilePrompt.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});
    return (
        <article className="message">
            <div className="message-body">
                You need to complete your profile before been able to create articles!
            </div>
        </article>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => ProfilePrompt.handleClickOutside
};

export default onClickOutside(ProfilePrompt, clickOutsideConfig);
