import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik} from "formik";
import {updateDocument} from "../utils";
import React, {useEffect} from "react";
import {toast} from "react-toastify";

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
                g.setModal({type: "modal_is_open", payload: false});
                g.setModal({type: "modal_content", payload: ""});
                toast.success("Article updated", {className: "is-success-alert"});
            }
        },
        validate(values) {
            const errors = {};
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
            return errors;
        },
    });
    useEffect(() => {
        return () => {
            g.setArticle({type: "edit_article", payload: null})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        onChange={formik.handleChange}/>
                </div>
                {formik.touched.title && formik.errors.title ? <p className="help is-danger">{formik.errors.title}</p> : null}
            </div>

            <div className="field">
                <label className="label label-modal">Subtitle</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${formik.touched.subtitle && formik.errors.subtitle ? "is-danger" : ""}`}
                        type="text" placeholder="Subtitle" name="subtitle" autoComplete="off" value={formik.values.subtitle}
                        onClick={e => {formik.setErrors({...formik.errors, "subtitle": ""})}}
                        onChange={formik.handleChange}/>
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

            <div className="field is-grouped create-buttons">
                <div className="control">
                    <button className="button create-submit-btn" type="submit" onClick={formik.handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => FormEdit.handleClickOutside
};

export default onClickOutside(FormEdit, clickOutsideConfig);
