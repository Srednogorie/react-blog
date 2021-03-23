import useGlobalState from "../globalState";
import {Link} from "react-router-dom";
import React from "react";
import {truncate} from "../utils";
import Categories from "./Categories";

function Landing() {
    const g = useGlobalState();
    const showArticle = (event) => {
        g.setArticle({type: "modal_is_open", payload: true});
    }

    return (
        <div className="container px-6 landing-main">
            <div className="landing-pub">
                <div>
                    <h2 className="landing-pub-header">Latest Publication</h2>
                </div>
                <div className="landing-pub-pub">
                    {g.s.article.nonAuthArticlesCurrent &&
                        <Link to="#" onClick={showArticle} className="landing-publication">
                            <div className="landing-publication-content">
                                <div className="landing-pub-icon">
                                    <img src={g.s.article.nonAuthArticlesCurrent.image_url} className="landing-custom" alt=""/>
                                </div>
                                <div className="landing-publication-text-area">
                                    <div
                                        className="landing-publication-title">{g.s.article.nonAuthArticlesCurrent.title}</div>
                                    <div
                                        className="landing-publication-author">{g.s.article.nonAuthArticlesCurrent.created.toDate().toLocaleDateString('en-UK')}</div>
                                    <div
                                        className="landing-publication-description">{truncate(g.s.article.nonAuthArticlesCurrent.content, 150)}</div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
            </div>
            <Categories/>
        </div>
    )
};

export default Landing;
