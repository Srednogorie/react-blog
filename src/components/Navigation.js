import logo from '../logo.png'
import {Link} from "react-router-dom";
import useGlobalState from "../globalState";

function Navigation() {
    const g = useGlobalState();
    return (
        <nav className="navbar custom-nav">
            <div className="container px-6">
                <div className="navbar-brand">
                    <Link to="/" className="logo-styles">
                        <img src={logo} alt='logo' className="logo-styles mr-3"/>
                    </Link>
                    <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/writers" className="navbar-item has-text-weight-semibold nav-link">Writers</Link>
                        <Link to="/about" className="navbar-item has-text-weight-semibold nav-link">About Us</Link>
                    </div>
                    <div className="navbar-end">
                        <input className="input is-align-self-center is-size-7 mr-6 mt-2 header-search" type="text" placeholder="Find writers or stories"/>
                        {!g.s.manage.isAuthenticated &&
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/sign" className="has-text-weight-semibold sign-style">Sign in</Link>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
