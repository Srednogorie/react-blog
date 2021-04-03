import {Link, useHistory} from "react-router-dom";
import {Fragment} from "react";
import useGlobalState from "../globalState";
import firebase from "../firebase";
import onClickOutside from "react-onclickoutside";

function NavbarMenu(props) {
    const g = useGlobalState();
    let history = useHistory();
    NavbarMenu.handleClickOutside = () => g.setManage({type: "toggle_menu", payload: false});

    const handleLogout = (event) => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful. Redirect to home.
            g.setAccount({type: "email", payload: ''});
            g.setAccount({type: "username", payload: ''});
            g.setAccount({type: "profilePicture", payload: ''});
            g.setAccount({type: "profileCompleted", payload: false});
            g.setArticle({type: "active_category", payload: 0});
            // Set the current article
            const currentCategory = g.s.article.categories[0];
            const currentArticles = g.s.article.nonAuthArticles;
            const currentArticle = currentArticles.filter(obj => obj.category === currentCategory)[0];
            g.setArticle({type: "current_article", payload: currentArticle});
            history.push("/");
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
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
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => NavbarMenu.handleClickOutside
};

export default onClickOutside(NavbarMenu, clickOutsideConfig);
