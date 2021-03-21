import useGlobalState from "../globalState";
import {Link} from "react-router-dom";
import React from "react";
import firebase from "../firebase";
import {truncate} from "../utils";
import AuthLanding from "./AuthLanding";

function Landing() {
    const g = useGlobalState();
    const showArticle = (event) => {
        g.setArticle({type: "modal_is_open", payload: true});
    }
    const handleCategoryChange = (event, index) => {
        g.setArticle({type: "active_category", payload: index});
        const currentArticles = g.s.article.nonAuthArticles;
        const currentArticle = currentArticles.filter(obj => obj.category === g.s.article.categories[index])[0];
        g.setArticle({type: "non_auth_articles_current", payload: currentArticle});
    }

    return (
        <div className="container px-6 landing-main">
            {!g.s.manage.isAuthenticated ?
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
                                        className="landing-publication-author">{g.s.article.nonAuthArticlesCurrent.subtitle}</div>
                                    <div
                                        className="landing-publication-description">{truncate(g.s.article.nonAuthArticlesCurrent.content, 150)}</div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
            </div>
            : <AuthLanding />
            }
            <div className="landing-categories">
                <h2 className="landing-cat-title">Categories</h2>
                <div className="landing-cat-cat">
                    {
                        g.s.article.categories.length > 0 &&
                        g.s.article.categories.map((category, index) => {
                            return (
                                <button
                                    onClick={(event) => {handleCategoryChange(event, index)}}
                                    key={index} className={`cat-button ${g.s.article.activeCategory === index && "active"}`}
                                    type="button">{category}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Landing;
