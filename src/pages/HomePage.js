import Header from "../components/Header";
import Landing from "../components/Landing";
import useGlobalState from "../globalState";
import React from 'react';
import firebase from "../firebase";

function HomePage() {
    const g = useGlobalState();
    const db = firebase.firestore();
    const articlesRef = db.collection("articles");
    React.useEffect(() => {
        const categories = g.s.article.categories;
        let unauthenticatedArticles = [];
        categories.forEach((category) => {
            // Get articles for unauthenticated users based on available categories
            articlesRef.where("category", "==", category).orderBy("created", "desc").limit(1).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let docData = doc.data();
                        docData['key'] = doc.id;
                        unauthenticatedArticles.push(docData);
                    });
                    g.setArticle({type: "non_auth_articles", payload: unauthenticatedArticles});
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        })
    }, [])
    React.useEffect(() => {
        // Set the current article
        const currentCategory = g.s.article.categories[0];
        const currentArticles = g.s.article.nonAuthArticles;
        const currentArticle = currentArticles.filter(obj => obj.category === currentCategory)[0];
        g.setArticle({type: "non_auth_articles_current", payload: currentArticle});
        return () => {
            g.setArticle({type: "active_category", payload: 0});
        }
    }, [g.s.article.nonAuthArticles])
    return (
        <div>
            {!g.s.manage.isAuthenticated && <Header />}
            <Landing />
        </div>
    )
}

export default HomePage;
