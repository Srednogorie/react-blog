import useGlobalState from "../globalState";
import {useEffect} from "react";

function Categories() {
    const g = useGlobalState();
    const handleCategoryChange = (event, index) => {
        g.setArticle({type: "active_category", payload: index});
        const currentArticles = g.s.article.nonAuthArticles;
        const currentArticle = currentArticles.filter(obj => obj.category === g.s.article.categories[index])[0];
        g.setArticle({type: "current_article", payload: currentArticle});
    }
    return (
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
    )
}

export default Categories;
