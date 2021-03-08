import logo from '../logo.png'

export default function Navigation() {
    return (
        <nav className="navbar custom-nav">
            <div className="container pl-6 pr-6">
                <div className="navbar-brand">
                    <img src={logo} alt='logo' className="logo-styles mr-3"/>
                    <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item has-text-weight-semibold" href="#">Writers</a>
                        <a className="navbar-item has-text-weight-semibold" href="#">About Us</a>
                    </div>
                    <div className="navbar-end">
                        <input className="input is-align-self-center is-size-7 mr-6 mt-2" type="text" placeholder="Find writers or stories"/>
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="has-text-weight-semibold sign-style" href="#">Sign in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
