import React from 'react';

function FileUpload(props) {
    const {field, form} = props;

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
                            Choose profile image
                          </span>
                        </span>
                <span className="file-name">{form.values.avatarFile ? form.values.avatarFile.name : "Image not attached"}</span>
            </label>
        </div>
    );
}

export default FileUpload;
