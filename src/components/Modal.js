import useGlobalState from "../globalState";
import Article from "./Article";
import FormCreate from "./FormCreate";

function Modal() {
    const g = useGlobalState();
    return (
        <div className={`modal ${g.s.modal.modalIsOpen ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {g.s.modal.modalContent === "article" && <Article />}
                {g.s.modal.modalContent === "form_create" && <FormCreate />}
            </div>
        </div>
    )
}

export default Modal;
