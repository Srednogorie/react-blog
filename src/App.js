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

function App() {
    const g =   useGlobalState();

    React.useEffect(() => {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    g.setManage({type: "is_authenticated", payload: true});
                } else {
                    g.setManage({type: "is_authenticated", payload: false});
                }
            });
        }, 2000)
    }, []);
    return (
        <div className="page-wrapper">
            {g.s.manage.isAuthenticated === null ? <Loading /> :
                <Fragment>
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
}

export default App;
