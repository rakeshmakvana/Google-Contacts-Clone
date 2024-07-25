import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../firebase"
const provider = new GoogleAuthProvider();

export const login = (user) => {
    localStorage.setItem('googleuser', JSON.stringify(user));
    return {
        type: 'LOGIN',
        payload: user
    }
}

export const register = (user) => {
    return {
        type: 'REGISTER',
        payload: user
    }
}

export const logout = () => {
    localStorage.removeItem('googleuser');
    return {
        type: 'LOGOUT'
    }
}

export const err = (err) => {
    return {
        type: 'ERROR',
        payload: err
    }
}

export const loading = () => {
    return {
        type: 'LOADING'
    }
}

export const loginAsync = (data) => {
    return async dispatch => {
        dispatch(loading());
        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(login(user));
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/network-request-failed).') {
                    dispatch(err('Invalid Network Connection.'));
                } else if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
                    dispatch(err('Invalid Email or Password.'))
                }
            });
    }
}

export const registerAsync = (data) => {
    return async dispatch => {
        dispatch(loading());
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(register(user));
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                    dispatch(err('Email Already Register.'));
                } else if (errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    dispatch(err('Password Must 6 Characters'));
                } else if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    dispatch(err('Invalid Email.'));
                } else if (errorMessage === 'Firebase: Error (auth/network-request-failed).') {
                    dispatch(err('Invalid Network Connection.'));
                }
            });
    }
}

export const logoutAsync = () => {
    return async dispatch => {
        await signOut(auth).then(() => {
            dispatch(logout());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const GoogleloginAsync = () => {
    return async dispatch => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(login(user))
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorMessage);
            });
    }
}