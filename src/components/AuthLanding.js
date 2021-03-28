import useGlobalState from "../globalState";
import {useEffect} from 'react';
import Categories from "./Categories";
function AuthLanding() {
    const g =   useGlobalState();

    const openArticle = (event) => {
        console.log(event);
    }
    const editArticle = (event, id) => {
        g.setModal({type: "modal_is_open", payload: true});
        g.setModal({type: "modal_content", payload: "form_edit"});
        const article = g.s.article.authArticles.filter((article) => {
            return article.key === id;
        })
        g.setArticle({type: "edit_article", payload: article[0]});
    }
    const deleteArticle = (event, id) => {
        console.log(event);
    }
    const newArticle = (event) => {
        g.setModal({type: "modal_is_open", payload: true});
        if (g.s.account.profileCompleted) {
            g.setModal({type: "modal_content", payload: "form_create"});
        } else {
            g.setModal({type: "modal_content", payload: "profile_prompt"});
        }
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
                    <span onClick={newArticle} className="tag is-medium is-primary timeline-header-custom">Write Article</span>
                </header>
                {g.s.article.authArticlesCurrent && g.s.article.authArticlesCurrent.map((article, index) => (
                    <div className="timeline-item is-primary" key={article.key}>
                        <div onClick={openArticle} className="timeline-marker is-primary is-image is-64x64 article-image" style={{backgroundImage: `url(${article.image_url})`}}>
                        </div>
                        <div className="timeline-content">
                            <p className="heading">{article.created.toDate().toLocaleDateString('en-UK')}</p>
                            <p className="heading">By: {article.author}</p>
                            <p>{article.title}</p>
                            {g.s.account.email === article.author_email && (
                                <div className="manage-buttons">
                                    <button onClick={(e) => editArticle(e, article.key)} className="manage-buttons-btn">Edit</button>
                                    <button onClick={(e) => deleteArticle(e, article.key)} className="manage-buttons-btn">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Categories/>
        </div>
    )
};

export default AuthLanding;
