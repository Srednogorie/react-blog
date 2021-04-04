import logo from '../logo.png'
import {Link} from "react-router-dom";
import useGlobalState from "../globalState";
import NavbarMenu from "./NavbarMenu";

function Navigation() {
    const g = useGlobalState();

    const handleToggle = (event) => {
        g.setManage({type: "toggle_menu", payload: !g.s.manage.toggleMenu});
    }
    return (
        <nav className="navbar custom-nav">
            <div className="container px-6 is-relative">
                <div className="navbar-brand">
                    <Link to="/" className="logo-styles">
                        <img src={logo} alt='logo' className="logo-styles mr-3"/>
                    </Link>
                    <Link to="#" className={`navbar-burger ${g.s.manage.toggleMenu ? 'is-active' : ''}`} role="button" aria-label="menu" aria-expanded="false" onClick={handleToggle}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>
                </div>
                <NavbarMenu/>
            </div>
        </nav>
    );
}

export default Navigation;
