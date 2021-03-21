import './App.sass';
import React, {Fragment} from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WritersPage from "./pages/WritersPage";
import AboutPage from "./pages/AboutPage";
import SignPage from "./pages/SignPage";
import Register from "./pages/Register";
import firebase from "firebase";
import useGlobalState from "./globalState";
import RouteAuthenticated from "./protectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Loading from "./components/Loading";
import Article from "./components/Article";

function App() {
    const g =   useGlobalState();
    const db = firebase.firestore();
    const categoriesRef = db.collection("categories");

    React.useEffect(() => {
        // Figure out authentication
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    g.setManage({type: "is_authenticated", payload: true});
                } else {
                    g.setManage({type: "is_authenticated", payload: false});
                }
            });
        }, 2000)

        // Get available categories
        categoriesRef.where("articles", ">", 0).get()
            .then((querySnapshot) => {
                let categories = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    categories.push(doc.data().category);
                });
                g.setArticle({type: "categories", payload: categories});
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, []);
    return (
        <div className="page-wrapper">
            {g.s.manage.isAuthenticated === null ? <Loading /> :
                <Fragment>
                    {g.s.article.modalIsOpen && <Article />}
                    <Navigation />
                        <div className="content-wrapper">
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <RouteAuthenticated path="/writers" component={WritersPage} />}
                                <RouteAuthenticated path="/profile" component={ProfilePage} />
                                <Route path="/about" exact component={AboutPage} />
                                <Route path="/sign" exact component={SignPage} />
                                <Route path="/register" exact component={Register} />
                            </Switch>
                        </div>
                    <Footer />
                </Fragment>
            }
        </div>
    );
};

export default App;
