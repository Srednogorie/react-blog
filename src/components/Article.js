import useGlobalState from "../globalState";
import onClickOutside from "react-onclickoutside";
import React from "react";

function Article() {
    const g = useGlobalState();
    Article.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    return (
        <div className="modal-card">
            <section className="modal-card-body">
                <div className="read-article-img-container">
                    <div
                        className="read-article-img"
                        style={{backgroundImage: `url(${g.s.article.currentArticle.image_url})`}}
                    />
                </div>
                <h1 className="modal-card-title card-content">{g.s.article.currentArticle.title}</h1>
                <h3 className="card-content card-content-subtitle">{g.s.article.currentArticle.subtitle}</h3>
                <p className="card-content card-content-info">
                    <span>
                        <strong>By: {g.s.article.currentArticle.author}</strong>
                    </span>
                    <span>
                        <strong className="read-created">Created: {g.s.article.currentArticle.created.toDate().toLocaleDateString('en-UK')}</strong>
                    </span>
                </p>
                <p className="card-content">{g.s.article.currentArticle.content}</p>
            </section>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Article.handleClickOutside
};

export default onClickOutside(Article, clickOutsideConfig);
