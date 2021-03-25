import React from 'react';

function FileUpload(props) {
    const {field, form} = props;

    const handleChange = (e) => {
        const file  =  e.currentTarget.files[0];
        const reader = new FileReader();
        const imgTag = document.getElementById("articleImageCreate");
        imgTag.title = file.name;
        reader.onload = function(event) {
            imgTag.src = event.target.result;
        };
        reader.readAsDataURL(file);
        form.setFieldValue(field.name, file);
    };

    return (
        <div className="file has-name is-fullwidth">
            <label className="file-label label-modal">
                <input id="articleImageCreate" type='file' onChange={(o) => handleChange(o)} className='file-input'/>
                <span className="file-cta">
                          <span className="file-label">
                            Choose article image
                          </span>
                        </span>
                <span className="file-name">{form.values.imageFile ? form.values.imageFile.name : "File not attached"}</span>
            </label>
        </div>
    );
}

export default FileUpload;
