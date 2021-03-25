import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {Fragment, useEffect} from "react";
import {useFormik, Field, FormikProvider} from "formik";
import firebase from "../firebase";
import FileUpload from "./FileUpload";

function FormCreate() {
    const g = useGlobalState();
    FormCreate.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            author: "",
            category: "",
            title: "",
            subtitle: "",
            content: "",
            imageFile: "",
            created: ""
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
        <div>
            <div className="field">
                <label className="label label-modal">Author</label>
                <div className="control">
                    <input className="input" type="text" value="Sando" disabled style={{color: "#c3c6cc"}}/>
                </div>
            </div>

            <div className="field">
                <label className="label label-modal">Category</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select required name="category" value={formik.values.category} onChange={formik.handleChange}>
                            <option value="" disabled selected hidden>Select Category</option>
                            {g.s.article.categories.map((category, index) => {
                                return <option key={index} value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label label-modal">Title</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" placeholder="Title" name="title" value={formik.values.title} onChange={formik.handleChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
                <label className="label label-modal">Subtitle</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" placeholder="Subtitle" name="subtitle" value={formik.values.subtitle} onChange={formik.handleChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>

            <div className="field">
                <label className="label label-modal">Content</label>
                <div className="control">
                    <textarea className="textarea" placeholder="Your article" name="content" onChange={formik.handleChange} value={formik.values.content}></textarea>
                </div>
            </div>
            <FormikProvider value={formik}>
                <Field name="imageFile" component={FileUpload}/>
            </FormikProvider>

            <div className="field is-grouped create-buttons">
                <div className="control">
                    <button className="button create-submit-btn" type="submit" onClick={formik.handleSubmit}>Submit</button>
                </div>
                <div className="control">
                    <button className="button create-cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => FormCreate.handleClickOutside
};

export default onClickOutside(FormCreate, clickOutsideConfig);
