import useGlobalState from "../globalState";
import Article from "./Article";
import FormCreate from "./FormCreate";
import ProfilePrompt from "./ProfilePrompt";
import FormEdit from "./FormEdit";
import DeleteArticle from "./DeleteArticle";

function Modal() {
    const g = useGlobalState();
    return (
        <div className={`modal ${g.s.modal.modalIsOpen ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {g.s.modal.modalContent === "article" && <Article />}
                {g.s.modal.modalContent === "form_create" && <FormCreate />}
                {g.s.modal.modalContent === "form_edit" && <FormEdit />}
                {g.s.modal.modalContent === "profile_prompt" && <ProfilePrompt />}
                {g.s.modal.modalContent === "delete_article" && <DeleteArticle />}
            </div>
        </div>
    )
}

export default Modal;
