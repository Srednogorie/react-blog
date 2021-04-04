import Header from "../components/Header";
import Landing from "../components/Landing";
import useGlobalState from "../globalState";
import React, {Fragment} from 'react';
import firebase from "../firebase";
import AuthLanding from "../components/AuthLanding";

function HomePage() {
    const g = useGlobalState();
    const db = firebase.firestore();
    const articlesRef = db.collection("articles");
    React.useEffect(() => {
        const categories = g.s.article.categories;
        let unauthenticatedArticles = [];
        let authenticatedArticles = [];
        if (g.s.manage.isAuthenticated) {
            categories.forEach((category) => {
                // Get articles for unauthenticated users based on available categories
                articlesRef.where("category", "==", category).orderBy("created", "desc").limit(5).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let docData = doc.data();
                            docData['key'] = doc.id;
                            authenticatedArticles.push(docData);
                        });
                        g.setArticle({type: "auth_articles", payload: authenticatedArticles});
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            })
        } else {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    React.useEffect(() => {
        // Set the current article
        const currentCategory = g.s.article.categories[0];
        const currentArticles = g.s.article.nonAuthArticles;
        const currentArticle = currentArticles.filter(obj => obj.category === currentCategory)[0];
        g.setArticle({type: "current_article", payload: currentArticle});
        return () => {
            g.setArticle({type: "active_category", payload: 0});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g.s.article.nonAuthArticles])
    return (
        <div>
            {g.s.manage.isAuthenticated ?
                <AuthLanding/>
                :
                <Fragment>
                    <Header/>
                    <Landing/>
                </Fragment>
            }
        </div>
    )
}

export default HomePage;
