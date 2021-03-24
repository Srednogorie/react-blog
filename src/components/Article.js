import useGlobalState from "../globalState";
import onClickOutside from "react-onclickoutside";
import React from "react";

function Article() {
    const g = useGlobalState();
    Article.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    return (
        <div className="modal-card">
            <section className="modal-card-body">
                <div>
                    <img src={g.s.article.nonAuthArticlesCurrent.image_url} className="landing-custom" alt=""/>
                    <h1 className="modal-card-title card-content">{g.s.article.nonAuthArticlesCurrent.title}</h1>
                </div>
                <p><span>By: {g.s.article.nonAuthArticlesCurrent.author}</span><span>Created:</span></p>
                <p className="card-content">{g.s.article.nonAuthArticlesCurrent.content}</p>
            </section>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Article.handleClickOutside
};

export default onClickOutside(Article, clickOutsideConfig);
