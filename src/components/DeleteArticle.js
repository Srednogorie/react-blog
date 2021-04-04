import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useEffect} from 'react';
import {deleteDocument, deleteStorageItem} from "../utils";
import {toast} from "react-toastify";

function DeleteArticle(props) {
    const g = useGlobalState();
    DeleteArticle.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    async function handleDelete(e) {
        const toDelete = g.s.article.authArticles.filter(el => el.key === g.s.article.deleteArticle)[0];
        const deleteCode = await deleteDocument("articles", toDelete.key);
        const deleteFileCode = await deleteStorageItem("article_images", toDelete.image_ref);
        if (deleteCode === 200 && deleteFileCode === 200) {
            g.setArticle({type: "auth_articles", payload: g.s.article.authArticles.filter(
                (el) => el.key !== g.s.article.deleteArticle
            )})
        }
        g.setModal({type: "modal_is_open", payload: false});
        g.setModal({type: "modal_content", payload: ""});
        toast("Article deleted!", {className: "is-success-alert"});
    }

    useEffect(() => {
        return () => {
            g.setArticle({type: "delete_article", payload: null})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="card">
            <div className="card-content card-content-delete">
                <div className="content">Are you sure you want to delete this?</div>
                <div className="buttons delete-buttons">
                    <button onClick={handleDelete} className="button is-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => DeleteArticle.handleClickOutside
};

export default onClickOutside(DeleteArticle, clickOutsideConfig);
