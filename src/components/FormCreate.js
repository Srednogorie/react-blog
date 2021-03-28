import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik, Field, FormikProvider} from "formik";
import FileUpload from "./FileUpload";
import {createDocument, fileUpload, resizeFile} from "../utils";
import firebase from "../firebase";
import {useEffect} from "react";

function FormCreate() {
    const g = useGlobalState();
    FormCreate.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            author: g.s.account.username,
            category: "",
            title: "",
            subtitle: "",
            content: "",
            image_url: "",
            created: ""
        },
        async onSubmit(values) {
            const {imageFile, ...data} = values;
            const file = await resizeFile(imageFile);
            const fileUrl = await fileUpload("article_images", file);
            if (fileUrl) {
                const {url, fileRef} = fileUrl
                data.image_url = url;
                data.image_ref = fileRef;
                data.author_email = g.s.account.email;
                data.created = firebase.firestore.Timestamp.fromDate(new Date());
                const newDoc = await createDocument(data, "articles");
                let newArticleState = g.s.article.authArticles;
                data.key = newDoc.id;
                newArticleState.unshift(data);
                g.setArticle({type: "auth_articles", payload: [...newArticleState]});
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
        const currentCategory = g.s.article.categories[g.s.article.activeCategory];
        const currentArticles = g.s.article.authArticles;
        const currentCategoryArticles = currentArticles.filter(obj => obj.category === currentCategory);
        g.setArticle({type: "auth_articles_current", payload: currentCategoryArticles});
    }, [g.s.article.authArticles])

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
            <FormikProvider value={formik}>
                <Field name="imageFile" buttonText="article image" identifier="formArticle" component={FileUpload}/>
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
