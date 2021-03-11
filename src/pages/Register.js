import {Link} from "react-router-dom";

function Register() {
    return (
        <div className="container mx-6 my-6">
            <div className="sign-wrapper">
                <form action="/api/v1/email-login" method="post" className="sign-form" >
                    <div className="sign-fancy-input">
                        <input type="text" name="username" placeholder="Your Username" />
                    </div>
                    <div className="sign-fancy-input">
                        <input type="email" name="email" placeholder="Your Email" />
                    </div>
                    <div className="sign-fancy-input">
                        <input type="password" name="password" placeholder="Your Password" />
                    </div>
                    <div id="sign-error-container"></div>
                    <div className="sign-buttons">
                        <button className="sign-submit" type="submit" >Register</button>
                        <span className="sign-span">or <Link to="/sign" className="sign-login-option">login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
