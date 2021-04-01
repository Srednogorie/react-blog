import firebase from "./firebase";
import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';

const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
}

const fileUpload = (path, file) => {
    return new Promise(function(resolve, reject) {
        const storageRef = firebase.storage().ref();
        const fileName = uuidv4();
        const reference = storageRef.child(`${path}/${fileName}`);
        let uploadTask = reference.putString(file, 'data_url');
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
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve({url: downloadURL, fileRef: fileName})
                })
            }
        );
    })
}

const updateProfile = (photoUrl=null, pseudonym) => {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        if (photoUrl) {
            user.updateProfile({
                displayName: pseudonym,
                photoURL: photoUrl
            }).then(function() {
                resolve(true);
            }).catch(function(error) {
                // An error happened.
            });
        } else {
            user.updateProfile({
                displayName: pseudonym,
            }).then(function() {
                resolve(true);
            }).catch(function(error) {
                // An error happened.
            });
        }
    })
}

const updateDocument = (id, data, collection) => {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
        const docRef = db.collection(collection).doc(id);
        docRef.update(data)
        .then(() => {
            resolve(200);
        })
        .catch((error) => {
            // The document probably doesn't exist.
            reject(400);
        });
    })
}

const createDocument = (data, collection) => {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
        db.collection(collection).add(data)
        .then((docRef) => {
            resolve(docRef)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

const deleteDocument = (collection, id) => {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(id).delete().then(() => {
            resolve(200)
        }).catch((error) => {
            reject(error)
        });
    })
}

const deleteStorageItem = (collection, fileName) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const desertRef = storageRef.child(`${collection}/${fileName}`);
    return new Promise((resolve, reject) => {
        desertRef.delete().then(() => {
            resolve(200)
        }).catch((error) => {
            reject(error)
        });
    })
}

const resizeFile = (file) => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });
}

export {
    truncate, fileUpload, updateProfile, updateDocument, resizeFile,
    createDocument, deleteDocument, deleteStorageItem
}
