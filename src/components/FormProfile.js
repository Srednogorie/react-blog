import onClickOutside from "react-onclickoutside";
import useGlobalState from "../globalState";
import {useFormik, Field, FormikProvider} from "formik";
import FileUpload from "./FileUpload";
import {fileUpload, resizeFile, updateProfile} from "../utils";
import {useHistory} from "react-router-dom";

function FormProfile() {
    const g = useGlobalState();
    const history = useHistory();

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
                const file = await resizeFile(values.avatarFile);
                const fileUrl = await fileUpload("profile_images", file);
                if (fileUrl) {
                    const profileUpdated = updateProfile(fileUrl, values.pseudonym);
                    if (profileUpdated) {
                        g.setAccount({type: "username", payload: values.pseudonym});
                        g.setAccount({type: "profilePicture", payload: fileUrl});
                        g.setAccount({type: "profileCompleted", payload: true});
                    }
                } else {
                    // Handle something went wrong
                }
            } catch(err) {
                console.log(err);
            }
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
                    <input className="input" onChange={formik.handleChange} value={formik.values.pseudonym} type="text" name="pseudonym" placeholder="Your pseudonym" />
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" type="text" value={g.s.account.email} disabled style={{color: "#c3c6cc"}}/>
                </div>
            </div>

            <FormikProvider value={formik}>
                <Field name="avatarFile" buttonText="profile image" identifier="formProfile" component={FileUpload}/>
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
