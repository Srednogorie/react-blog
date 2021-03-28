import React from 'react';
import useGlobalState from "../globalState";

function FileUpload(props) {
    const {field, form} = props;
    const g = useGlobalState();

    const handleChange = (e) => {
        const file  =  e.currentTarget.files[0];
        const reader = new FileReader();
        const imgTag = document.getElementById("fileId");
        imgTag.title = file.name;
        reader.onload = function(event) {
            imgTag.src = event.target.result;
        };
        reader.readAsDataURL(file);
        form.setFieldValue(field.name, file);
    };

    return (
        <div className="file has-name is-fullwidth">
            <label className="file-label">
                <input id="fileId" type='file' onChange={(o) => handleChange(o)} className='file-input'/>
                <span className="file-cta">
                          <span className="file-label">
                              {props.identifier === "formProfile" && `${g.s.account.profileCompleted ? "Change" : "Choose"} ${props.buttonText}`}
                              {/*{props.identifier === "formArticle" && `${g.s.account.profileCompleted ? "Change" : "Choose"} ${props.buttonText}`}*/}
                          </span>
                        </span>
                <span className={`file-name ${props.identifier === "formArticle" ? "label-modal" : ""}`}>{form.values.avatarFile ? form.values.avatarFile.name : "Image not attached"}</span>
            </label>
        </div>
    );
}

export default FileUpload;
