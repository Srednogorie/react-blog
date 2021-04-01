import {Link, useHistory, withRouter} from "react-router-dom";
import useGlobalState from "../globalState";
import {useFormik} from "formik";
import firebase from "../firebase";
import React, {useEffect} from 'react';
import {toast} from "react-toastify";

function SignPage() {
    const g =   useGlobalState();
    const history = useHistory();
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit(values) {
            g.setLogin({type: "errors", payload: {"message": ""}});
            g.setManage({type: "is_authenticated", payload: null});
            const email = values.email;
            const password = values.password;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // formik.resetForm();
                    g.setManage({type: "is_authenticated", payload: true});
                    g.setAccount({type: "email", payload: user.email});
                    history.push("/");
                    toast.success("Welcome back!", {className: "is-success-alert"});
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    g.setLogin({type: "errors", payload: {"message": errorMessage}});
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
            return errors;
        },
    });
    useEffect(() => {
        return () => {
            g.setLogin({type: "errors", payload: {"message": ""}});
        };
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
                    <div className="errorMessage">
                        {g.s.login.errors["message"] && <span>{g.s.login.errors["message"]}</span>}
                    </div>
                    <div className="sign-buttons">
                        <button className="sign-submit" type="submit" >Login</button>
                        <span className="sign-span"><Link to="/register" className="sign-login-option">or register</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(SignPage);
