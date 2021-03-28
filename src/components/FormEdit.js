import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik, Field, FormikProvider} from "formik";
import FileUpload from "./FileUpload";
import {updateDocument} from "../utils";
import {useEffect} from "react";

function FormEdit() {
    const g = useGlobalState();
    FormEdit.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            author: g.s.account.username,
            category: g.s.article.editArticle.category,
            title: g.s.article.editArticle.title,
            subtitle: g.s.article.editArticle.subtitle,
            content: g.s.article.editArticle.content,
            imageFile: "",
            created: ""
        },
        async onSubmit(values) {
            let data = values
            Object.keys(data).forEach((k) => data[k] === "" && delete data[k]);
            const updateCode = await updateDocument(g.s.article.editArticle.key, data, "articles");
            if (updateCode === 200) {
                g.setArticle({
                    type: "auth_articles",
                    payload: g.s.article.authArticles.map(
                        el => (el.key === g.s.article.editArticle.key ? {...el, ...data} : el)
                    )
                });
            }
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
    useEffect(() => {
        return () => {
            g.setArticle({type: "edit_article", payload: null})
        }
    }, [])
    return (
        <div>
            <div className="field">
                <label className="label label-modal">Author</label>
                <div className="control">
                    <input className="input" type="text" value={formik.values.author} disabled style={{color: "#c3c6cc"}}/>
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
                    <input className="input is-success" type="text" placeholder="Title" name="title" autoComplete="off" value={formik.values.title} onChange={formik.handleChange}/>
                </div>
                <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
                <label className="label label-modal">Subtitle</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" placeholder="Subtitle" name="subtitle" autoComplete="off" value={formik.values.subtitle} onChange={formik.handleChange}/>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>

            <div className="field">
                <label className="label label-modal">Content</label>
                <div className="control">
                    <textarea className="textarea" placeholder="Your article" name="content" onChange={formik.handleChange} value={formik.values.content}/>
                </div>
            </div>

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
    handleClickOutside: () => FormEdit.handleClickOutside
};

export default onClickOutside(FormEdit, clickOutsideConfig);
