import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {Fragment, useEffect} from "react";
import {useFormik, Field, FormikProvider} from "formik";
import firebase from "../firebase";
import FileUpload from "./FileUpload";

function FormProfile() {
    const g = useGlobalState();
    FormProfile.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            pseudonym: "",
            avatarFile: ""
        },
        onSubmit(values) {
            console.log(values);
            // g.setLogin({type: "errors", payload: {"message": ""}});
            // g.setManage({type: "is_authenticated", payload: null});
            // const email = values.email;
            // const password = values.password;
            // firebase.auth().signInWithEmailAndPassword(email, password)
            //     .then((userCredential) => {
            //         // Signed in
            //         const user = userCredential.user;
            //         formik.resetForm();
            //         g.setManage({type: "is_authenticated", payload: true});
            //         // history.push("/");
            //     })
            //     .catch((error) => {
            //         // const errorCode = error.code;
            //         const errorMessage = error.message;
            //         g.setLogin({type: "errors", payload: {"message": errorMessage}});
            //         formik.resetForm();
            //     });
        },
        // validate(values) {
        //     const errors = {};
        //     if (!values.email) {
        //         errors.email = 'Required';
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address';
        //     }
        //     // Validate passwords
        //     if (!values.password) {
        //         errors.password = 'Required';
        //     }
        //     return errors;
        // },
    });

    return (
        <div className="modal-content form-profile">
            <div className="field">
                <label className="label">Pseudonym</label>
                <div className="control">
                    <input className="input" type="text" value=""/>
                </div>
            </div>

            <div className="field">
                <label className="label label-modal">Email</label>
                <div className="control">
                    <input className="input" type="text" value="akrachunov@gmail.com" disabled style={{color: "#c3c6cc"}}/>
                </div>
            </div>

            <FormikProvider value={formik}>
                <Field name="imageFile" component={FileUpload}/>
            </FormikProvider>

            <div className="field is-grouped create-buttons">
                <div className="control">
                    <button className="button create-submit-btn" type="submit" onClick={formik.handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => FormProfile.handleClickOutside
};

export default onClickOutside(FormProfile, clickOutsideConfig);
