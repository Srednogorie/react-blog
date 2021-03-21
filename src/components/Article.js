import useGlobalState from "../globalState";
import ArticleContent from "./ArticleContent";

function Article() {
    const g = useGlobalState();
    return (
        <div className={`modal ${g.s.article.modalIsOpen ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <ArticleContent />
            </div>
        </div>
    )
}

export default Article;
