import './App.sass';
import React, {Fragment} from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignPage from "./pages/SignPage";
import Register from "./pages/Register";
import firebase from "firebase";
import useGlobalState from "./globalState";
import RouteAuthenticated from "./protectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                    g.setAccount({type: "email", payload: user.email});
                    const userPhoto = user.photoURL;
                    const userName = user.displayName;
                    if (userPhoto && userName) {
                        g.setAccount({type: "username", payload: user.displayName});
                        g.setAccount({type: "profilePicture", payload: user.photoURL});
                        g.setAccount({type: "profileCompleted", payload: true});
                    }
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover closeButton={false}/>
            {g.s.manage.isAuthenticated === null ? <Loading /> :
                <Fragment>
                    {g.s.modal.modalIsOpen && <Modal />}
                    <Navigation />
                        <div className="content-wrapper">
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <RouteAuthenticated path="/profile" component={ProfilePage} />
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
