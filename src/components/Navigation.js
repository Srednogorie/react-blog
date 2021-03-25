import logo from '../logo.png'
import {Link} from "react-router-dom";
import useGlobalState from "../globalState";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import {Fragment} from "react";

function Navigation() {
    const g = useGlobalState();
    let history = useHistory();
    const handleLogout = (event) => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful. Redirect to home.
            history.push("/");
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleToggle = (event) => {
        g.setManage({type: "toggle_menu", payload: !g.s.manage.toggleMenu})
    }
    return (
        <nav className="navbar custom-nav">
            <div className="container px-6 is-relative">
                <div className="navbar-brand">
                    <Link to="/" className="logo-styles">
                        <img src={logo} alt='logo' className="logo-styles mr-3"/>
                    </Link>
                    <a className={`navbar-burger ${g.s.manage.toggleMenu ? 'is-active' : ''}`} role="button" aria-label="menu" aria-expanded="false" onClick={handleToggle}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${g.s.manage.toggleMenu ? 'is-active is-active-panel' : ''}`}>
                    <div className="navbar-end">
                        {g.s.manage.isAuthenticated && <input className={`input is-align-self-center is-size-7 mr-6 mt-2 header-search" type="text ${g.s.manage.toggleMenu ? 'is-active-search' : ''}`} placeholder="Find writers or stories"/>}
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    g.s.manage.isAuthenticated ? (
                                        <Fragment>
                                            <Link to="/profile" className="navbar-item has-text-weight-semibold nav-link">Profile</Link>
                                            <Link to="#" onClick={handleLogout} className="has-text-weight-semibold sign-style">Sign out</Link>
                                        </Fragment>
                                    ) : <Link to="/sign" className="has-text-weight-semibold sign-style">Sign in</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
