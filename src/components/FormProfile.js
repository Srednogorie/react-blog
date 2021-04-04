import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik, Field, FormikProvider} from "formik";
import FileUpload from "./FileUpload";
import {fileUpload, resizeFile, updateProfile} from "../utils";
import React from "react";
import {toast} from "react-toastify";

function FormProfile() {
    const g = useGlobalState();

    FormProfile.handleClickOutside = () => g.setModal({type: "modal_is_open", payload: false});

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            pseudonym: g.s.account.username || "",
            avatarFile: ""
        },
        async onSubmit(values) {
            try {
                let file, fileUrl;
                if (!g.s.account.profileCompleted) {
                    file = await resizeFile(values.avatarFile);
                    fileUrl = await fileUpload("profile_images", file);
                    const {url, fileRef} = fileUrl;
                    await updateProfile(url, values.pseudonym);
                    g.setAccount({type: "username", payload: values.pseudonym});
                    g.setAccount({type: "profilePicture", payload: url});
                } else {
                    await updateProfile(values.pseudonym);
                    g.setAccount({type: "username", payload: values.pseudonym});
                }
                if (!g.s.account.profileCompleted) {
                    toast.success("Profile created!", {className: "is-success-alert"});
                } else {
                    toast.success("Profile updated!", {className: "is-success-alert"});
                }
                g.setAccount({type: "profileCompleted", payload: true});
            } catch(err) {
                console.log(err);
            }
        },
        validate(values) {
            const errors = {};
            if (!values.pseudonym) {
                errors.pseudonym = 'Required';
            }
            // Validate passwords
            if (!g.s.account.profileCompleted) {
                if (!values.avatarFile) {
                    errors.avatarFile = 'Required';
                }
            }
            return errors;
        },
    });
    const handleFileClick = (e) => {
        formik.setErrors({...formik.errors, "avatarFile": ""})
    }

    return (
        <div className="modal-content form-profile">
            <div className="profile-image-wrap">
                <div className="profile-image" style={
                    g.s.account.profilePicture ?
                        {backgroundImage: `url(${g.s.account.profilePicture})`} :
                        {backgroundImage: `url(${g.s.account.defaultAvatar})`}}
                >
                </div>
            </div>

            <div className="field">
                <label className="label">Pseudonym</label>
                <div className="control">
                    <input
                        className={`input ${formik.touched.pseudonym && formik.errors.pseudonym ? "is-danger" : ""}`}
                        onChange={formik.handleChange} value={formik.values.pseudonym}
                        onClick={e => {formik.setErrors({...formik.errors, "pseudonym": ""})}}
                        type="text" name="pseudonym" placeholder="Your pseudonym"
                    />
                </div>
                {formik.touched.pseudonym && formik.errors.pseudonym ? <p className="help is-danger">{formik.errors.pseudonym}</p> : null}
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" type="text" value={g.s.account.email} disabled style={{color: "#c3c6cc"}}/>
                </div>
            </div>

            <FormikProvider value={formik}>
                <Field
                    name="avatarFile" buttonText="profile image" identifier="formProfile" component={FileUpload}
                    isDanger={!!(formik.touched.avatarFile && formik.errors.avatarFile)} cb={handleFileClick}
                />
                {formik.touched.avatarFile && formik.errors.avatarFile ? <p className="help is-danger">{formik.errors.avatarFile}</p> : null}
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
