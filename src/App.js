import './App.sass';
import React from "react";
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

function App() {
    const g =   useGlobalState();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                g.setManage({type: "is_authenticated", payload: true});
            } else {
                g.setManage({type: "is_authenticated", payload: false});
            }
        });
        console.log(g.s.manage.isAuthenticated);
    }, []);
    return (
        <div className="page-wrapper">
            <Navigation />
                <div className="content-wrapper">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/writers" exact component={WritersPage} />
                        <Route path="/about" exact component={AboutPage} />
                        <Route path="/sign" exact component={SignPage}/>
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </div>
            <Footer />
        </div>
    );
}

export default App;
