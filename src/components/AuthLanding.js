import useGlobalState from "../globalState";
import {Fragment, useEffect} from 'react';
import Categories from "./Categories";
import {formatTime} from "../utils";
function AuthLanding() {
    const g =   useGlobalState();

    useEffect(() => {
        const currentCategory = g.s.article.categories[g.s.article.activeCategory];
        const currentArticles = g.s.article.authArticles;
        const currentCategoryArticles = currentArticles.filter(obj => obj.category === currentCategory);
        g.setArticle({type: "auth_articles_current", payload: currentCategoryArticles});
    }, [g.s.article.authArticles, g.s.article.activeCategory])
    return (
        <div className="container px-6 landing-main">
            <div className="timeline is-centered">
                {g.s.article.authArticlesCurrent && g.s.article.authArticlesCurrent.map((article, index) => (
                    <div className="timeline-item is-primary" key={article.key}>
                        <div className="timeline-marker is-primary is-image is-64x64 test-image" style={{backgroundImage: `url(${article.image_url})`}}>
                        </div>
                        <div className="timeline-content">
                            <p className="heading">{article.created.toDate().toLocaleDateString('en-UK')}</p>
                            <p>{article.title}</p>
                            <div className="manage-buttons">
                                <button className="manage-buttons-btn">Edit</button>
                                <button className="manage-buttons-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Categories/>
        </div>
    )
};

export default AuthLanding;
