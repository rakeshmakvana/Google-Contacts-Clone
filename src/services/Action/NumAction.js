import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../firebase"

export const add = (data) => {
    return {
        type: 'ADD',
        payload: data
    }
}

export const get = (data) => {
    return {
        type: 'GET',
        payload: data
    }
}

export const update = (data) => {
    return {
        type: 'UPDATE',
        payload: data
    }
}

export const delet = () => {
    return {
        type: 'DELET',
    }
}

export const loading = () => {
    return {
        type: 'LOADING',
    }
}

export const err = (err) => {
    return {
        type: 'ERROR',
        payload: err
    }
}

export const addAsync = (data, imageFile) => {
    return async dispatch => {
        try {
            const user = JSON.parse(localStorage.getItem('googleuser'));
            let downloadURL = '';
            if (imageFile) {
                const storageRef = ref(storage, `${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);
                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        snapshot => { },
                        error => reject(error),
                        async () => {
                            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }
            const docRef = await addDoc(collection(db, "data"), { ...data, imageUrl: downloadURL, userId: user.uid });
            dispatch(add({ id: docRef.id, ...data, imageUrl: downloadURL, userId: user.uid }));
            dispatch(getAsync());
        } catch (error) {
            console.log(error);
        }
    };
};

export const getAsync = () => {
    return async dispatch => {
        try {
            const user = JSON.parse(localStorage.getItem('googleuser'));
            const q = query(collection(db, "data"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(get(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateAsync = (id, updatedData, imageFile) => {
    return async (dispatch) => {
        try {
            const docRef = doc(db, "data", id);
            let downloadURL = updatedData.imageUrl || '';
            if (imageFile) {
                if (updatedData.imageUrl) {
                    const storageRef2 = ref(storage, downloadURL);
                    deleteObject(storageRef2);
                }
                const storageRef = ref(storage, `${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);
                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        snapshot => { },
                        error => reject(error),
                        async () => {
                            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }
            await updateDoc(docRef, { ...updatedData, imageUrl: downloadURL });
            dispatch(update({ id, ...updatedData, imageUrl: downloadURL }));
            dispatch(getAsync());
        } catch (error) {
            console.log(error);
        }
    };
};

export const deletAsync = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const number = state.NumReducer.number.find(n => n.id === id);
            if (number) {
                const imageUrl = number.imageUrl;
                if (imageUrl) {
                    const storageRef = ref(storage, imageUrl);
                    await deleteObject(storageRef);
                }
            }
            const docRef = doc(db, "data", id);
            await deleteDoc(docRef);
            dispatch(delet(id));
            dispatch(getAsync());
        } catch (error) {
            console.log(error);
        }
    };
};

