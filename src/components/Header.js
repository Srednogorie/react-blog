import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="container px-6 header-main">
            <h1 className="header-title">Take back your mind</h1>
            <p className="header-p">StackSub is a place for independent writing. Subscribe directly to writers you trust.</p>
            <Link to="/sign" className="header-button">Start reading</Link>
        </div>
    )
}

export default Header;
