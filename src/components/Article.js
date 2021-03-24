import useGlobalState from "../globalState";
import ArticleContent from "./ArticleContent";

function Modal() {
    const g = useGlobalState();
    return (
        <div className={`modal ${g.s.modal.modalIsOpen ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {g.s.modal.modalContent === "article" && <ArticleContent />}
            </div>
        </div>
    )
}

export default Modal;
