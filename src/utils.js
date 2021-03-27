import firebase from "./firebase";

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
}

const fileUpload = (path, file) => {
    const storageRef = firebase.storage().ref();
    const reference = storageRef.child(`${path}/${file.name}`);
    let uploadTask = reference.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                return downloadURL;
            });
        }
    );
}

const updateProfile = (photoUrl, pseudonym) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: pseudonym,
        photoURL: photoUrl
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
}

export {truncate, fileUpload, updateProfile}
