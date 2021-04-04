import {Link, useHistory} from "react-router-dom";
import useGlobalState from "../globalState";
import firebase from '../firebase';
import {useFormik} from "formik";
import {useEffect} from "react";

function Register() {
    const g =   useGlobalState();
    const history = useHistory();
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit(values) {
            g.setSignup({type: "errors", payload: {"message": ""}});
            g.setManage({type: "is_authenticated", payload: null});
            const email = values.email;
            const password = values.password;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // formik.resetForm();
                    g.setManage({type: "is_authenticated", payload: true});
                    g.setAccount({type: "email", payload: user.email});
                    history.push("/profile");
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    g.setSignup({type: "errors", payload: {"message": errorMessage}});
                    formik.resetForm();
                });
        },
        validate(values) {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            // Validate passwords
            if (!values.password) {
                errors.password = 'Required';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            }
            if ((values.password && values.confirmPassword) && (values.password !== values.confirmPassword)) {
                errors.password = "Passwords should match"
                errors.confirmPassword = 'Passwords should match';
                values.password = "";
                values.confirmPassword = "";
            }

            return errors;
        },
    });
    useEffect(() => {
        return () => {
            g.setSignup({type: "errors", payload: {"message": ""}});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="container">
            <div className="sign-wrapper">
                <form className="sign-form" onSubmit={formik.handleSubmit}>
                    <div className="sign-fancy-input">
                        <input onChange={formik.handleChange} value={formik.values.email} onClick={e => {formik.setErrors({"email": ""})}} type="email" name="email" placeholder="Your Email" />
                        {formik.touched.email && formik.errors.email ? <span className="errorMessage">{formik.errors.email}</span> : null}
                    </div>
                    <div className="sign-fancy-input">
                        <input onChange={formik.handleChange} value={formik.values.password} onClick={e => {formik.setErrors({"password": ""})}} type="password" name="password" placeholder="Your Password" />
                        {formik.touched.password && formik.errors.password ? <span className="errorMessage">{formik.errors.password}</span> : null}
                    </div>
                    <div className="sign-fancy-input">
                        <input onChange={formik.handleChange} value={formik.values.confirmPassword} onClick={e => {formik.setErrors({"confirmPassword": ""})}} type="password" name="confirmPassword" placeholder="Your Password Again" />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span className="errorMessage">{formik.errors.confirmPassword}</span> : null}
                    </div>
                    <div className="errorMessage">
                        {g.s.signup.errors["message"] && <span>{g.s.signup.errors["message"]}</span>}
                    </div>
                    <div className="sign-buttons">
                        <button className="sign-submit" type="submit">Register</button>
                        <span className="sign-span"><Link to="/sign" className="sign-login-option">or login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
