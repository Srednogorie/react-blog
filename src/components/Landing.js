import useGlobalState from "../globalState";
import {Link} from "react-router-dom";
import React from "react";
import {truncate} from "../utils";
import Categories from "./Categories";
import {useEffect} from "react";

function Landing() {
    const g = useGlobalState();
    const showArticle = (e) => {
        g.setModal({type: "modal_content", payload: "article"});
        g.setModal({type: "modal_is_open", payload: true});
    }

    useEffect(() => {
        return () => {
            g.setModal({type: "modal_is_open", payload: null});
            g.setArticle({type: "current_article", payload: null});
        }
    }, [])

    return (
        <div className="container px-6 landing-main">
            <div className="landing-pub">
                <div>
                    <h2 className="landing-pub-header">Latest Publication</h2>
                </div>
                <div className="landing-pub-pub">
                    {g.s.article.currentArticle &&
                        <Link to="#" onClick={showArticle} className="landing-publication">
                            <div className="landing-publication-content">
                                <div className="landing-pub-icon">
                                    <img src={g.s.article.currentArticle.image_url} className="landing-custom" alt=""/>
                                </div>
                                <div className="landing-publication-text-area">
                                    <div className="landing-publication-title">{g.s.article.currentArticle.title}</div>
                                    <div className="landing-publication-author">{g.s.article.currentArticle.created.toDate().toLocaleDateString('en-UK')}</div>
                                    <div className="landing-publication-description">{truncate(g.s.article.currentArticle.content, 150)}</div>
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
