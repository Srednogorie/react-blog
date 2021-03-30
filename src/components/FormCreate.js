import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik, Field, FormikProvider} from "formik";
import FileUpload from "./FileUpload";
import {createDocument, fileUpload, resizeFile} from "../utils";
import firebase from "../firebase";
import React, {useEffect} from "react";

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
            created: "",
            imageFile: ""
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
        },
        validate(values) {
            const errors = {};
            // if (!values.email) {
            //     errors.email = 'Required';
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address';
            // }
            // Validate category
            if (!values.category) {
                errors.category = 'This filed is required';
            }
            // Validate title
            if (!values.title) {
                errors.title = 'This filed is required';
            }
            // Validate subtitle
            if (!values.subtitle) {
                errors.subtitle = 'This filed is required';
            }
            // Validate content
            if (!values.content) {
                errors.content = 'This filed is required';
            }
            // Validate file
            if (!values.imageFile) {
                errors.imageFile = 'This filed is required';
            }
            if (values.imageFile && values.imageFile.type !== "image/jpeg") {
                errors.imageFile = 'We support JPEG files only';
            }
            return errors;
        },
    });

    const handleFileClick = (e) => {
        formik.setErrors({...formik.errors, "imageFile": ""})
    }

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
                    <div
                        className={`select is-fullwidth ${formik.touched.category && formik.errors.category ? "is-danger" : ""}`}
                        onClick={e => {formik.setErrors({...formik.errors, "category": ""})}}
                    >
                        <select required name="category" value={formik.values.category} onChange={formik.handleChange}>
                            <option value="" disabled selected hidden>Select Category</option>
                            {g.s.article.categories.map((category, index) => {
                                return <option key={index} value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                    {formik.touched.category && formik.errors.category ? <p className="help is-danger">{formik.errors.category}</p> : null}
                </div>
            </div>

            <div className="field">
                <label className="label label-modal">Title</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${formik.touched.title && formik.errors.title ? "is-danger" : ""}`}
                        type="text" placeholder="Title" name="title" autoComplete="off" value={formik.values.title}
                        onClick={e => {formik.setErrors({...formik.errors, "title": ""})}}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.touched.title && formik.errors.title ? <p className="help is-danger">{formik.errors.title}</p> : null}
            </div>

            <div className="field">
                <label className="label label-modal">Subtitle</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${formik.touched.subtitle && formik.errors.subtitle ? "is-danger" : ""}`}
                        type="text" placeholder="Subtitle" name="subtitle" autoComplete="off"
                        value={formik.values.subtitle} onChange={formik.handleChange}
                        onClick={e => {formik.setErrors({...formik.errors, "subtitle": ""})}}
                    />
                </div>
                {formik.touched.subtitle && formik.errors.subtitle ? <p className="help is-danger">{formik.errors.subtitle}</p> : null}
            </div>

            <div className="field">
                <label className="label label-modal">Content</label>
                <div className="control">
                    <textarea
                        className={`textarea ${formik.touched.content && formik.errors.content ? "is-danger" : ""}`}
                        placeholder="Your article" name="content" onChange={formik.handleChange}
                        value={formik.values.content}
                        onClick={e => {formik.setErrors({...formik.errors, "content": ""})}}
                    />
                </div>
                {formik.touched.content && formik.errors.content ? <p className="help is-danger">{formik.errors.content}</p> : null}
            </div>
            <FormikProvider value={formik}>
                <Field
                    name="imageFile" buttonText="article image" identifier="formArticle" component={FileUpload}
                    isDanger={!!(formik.touched.imageFile && formik.errors.imageFile)} cb={handleFileClick}
                />
                {formik.touched.imageFile && formik.errors.imageFile ? <p className="help is-danger">{formik.errors.imageFile}</p> : null}
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
