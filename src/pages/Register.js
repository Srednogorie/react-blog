import {Link} from "react-router-dom";
import useGlobalState from "../globalState";
import firebase from '../firebase';

function Register() {
    const g =   useGlobalState();

    const handleChange = (event) => {
        g.setSignup({type: event.target.name, payload: event.target.value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = g.s.signup.email;
        const password = g.s.signup.password;
        const confirmPassword = g.s.signup.confirmPassword;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error.message);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        // g.setSignup({type: "loading", payload: true});
        // const newUserData = {
        //     firstName: g.s.signup.firstName,
        //     lastName: g.s.signup.lastName,
        //     phoneNumber: g.s.signup.phoneNumber,
        //     country: g.s.signup.country,
        //     username: g.s.signup.username,
        //     email: g.s.signup.email,
        //     password: g.s.signup.password,
        //     confirmPassword: g.s.signup.confirmPassword
        // };
        // axios
        //     .post('https://us-central1-todoapp-17e57.cloudfunctions.net/api/signup', newUserData)
        //     .then((response) => {
        //         const accessToken = response.data.token.stsTokenManager.accessToken;
        //         const refreshToken = response.data.token.stsTokenManager.refreshToken;
        //         localStorage.setItem('AuthToken', `Bearer ${accessToken}`);
        //         localStorage.setItem('RefreshToken', `${refreshToken}`);
        //         g.setSignup({type: "loading", payload: false})
        //         props.history.push('/');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         g.setSignup({type: "errors", payload: error.response.data});
        //         g.setSignup({type: "loading", payload: false});
        //         g.setSignup({type: "firstName", payload: ''});
        //         g.setSignup({type: "lastName", payload: ''});
        //         g.setSignup({type: "phoneNumber", payload: ''});
        //         g.setSignup({type: "country", payload: ''});
        //         g.setSignup({type: "username", payload: ''});
        //         g.setSignup({type: "email", payload: ''});
        //         g.setSignup({type: "password", payload: ''});
        //         g.setSignup({type: "confirmPassword", payload: ''});
        //     });
    };
    return (
        <div className="container mx-6 my-6">
            <div className="sign-wrapper">
                <form className="sign-form" >
                    <div className="sign-fancy-input">
                        <input onChange={handleChange} value={g.s.signup.email} type="email" name="email" placeholder="Your Email" />
                    </div>
                    <div className="sign-fancy-input">
                        <input onChange={handleChange} value={g.s.signup.password} type="password" name="password" placeholder="Your Password" />
                    </div>
                    <div className="sign-fancy-input">
                        <input onChange={handleChange} value={g.s.signup.confirmPassword} type="password" name="confirmPassword" placeholder="Your Password Again" />
                    </div>
                    <div id="sign-error-container"></div>
                    <div className="sign-buttons">
                        <button className="sign-submit" type="submit" onClick={handleSubmit}>Register</button>
                        <span className="sign-span">or <Link to="/sign" className="sign-login-option">login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
