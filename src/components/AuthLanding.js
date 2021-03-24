import useGlobalState from "../globalState";
import {useEffect} from 'react';
import Categories from "./Categories";
import 'font-awesome/css/font-awesome.min.css';
function AuthLanding() {
    const g =   useGlobalState();

    const openArticle = (event) => {
        console.log(event);
    }
    const editArticle = (event) => {
        console.log(event);
    }
    const deleteArticle = (event) => {
        console.log(event);
    }

    useEffect(() => {
        const currentCategory = g.s.article.categories[g.s.article.activeCategory];
        const currentArticles = g.s.article.authArticles;
        const currentCategoryArticles = currentArticles.filter(obj => obj.category === currentCategory);
        g.setArticle({type: "auth_articles_current", payload: currentCategoryArticles});
    }, [g.s.article.authArticles, g.s.article.activeCategory])
    return (
        <div className="container px-6 landing-main">
            <div className="timeline is-centered">
                <header className="timeline-header">
                    <span className="tag is-medium is-primary timeline-header-custom">Write Article</span>
                </header>
                {g.s.article.authArticlesCurrent && g.s.article.authArticlesCurrent.map((article, index) => (
                    <div className="timeline-item is-primary" key={article.key}>
                        <div onClick={openArticle} className="timeline-marker is-primary is-image is-64x64 article-image" style={{backgroundImage: `url(${article.image_url})`}}>
                        </div>
                        <div className="timeline-content">
                            <p className="heading">{article.created.toDate().toLocaleDateString('en-UK')}</p>
                            <p className="heading">By: {article.author}</p>
                            <p>{article.title}</p>
                            <div className="manage-buttons">
                                <button onClick={editArticle} className="manage-buttons-btn">Edit</button>
                                <button onClick={deleteArticle} className="manage-buttons-btn">Delete</button>
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
