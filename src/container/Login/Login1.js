import React, { useState } from 'react';
import initialization from '../../firebase/firebaseInitialize';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const Login = () => {
    initialization();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [fname, setFname] = useState('')


    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                console.log(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
            });
    }

    const handleGmailSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
            });
    }
    const handleFullName = e => {
        setFname(e.target.value)
    }
    const handleEmailPassword = event => {
        console.log(event.target)
        event.target.type == 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }
    const handleRegistrationForm = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log('Registers ', user)
                updateProfile(auth.currentUser, {
                    displayName: fname
                })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const errorEmail = error.email;
                console.log(errorMessage, ": for ", errorEmail)
            });
    }
    const handleLoginForm = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log('login Sucess', user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                console.log('Could Not login')
            });
    }
    return (
        <div>
            <p>Your Mail: {email}</p>
            <p>Name: {fname}</p>
            <h1 className="text-center">Create User</h1>
            <form onSubmit={handleRegistrationForm} action="" className="d-flex flex-column justify-content-center align-items-center">
                <input onBlur={handleFullName} required type="text" name="" id="" className="mb-1" />
                <input onBlur={handleEmailPassword} required type="email" name="" id="" className="mb-1" />
                <input onBlur={handleEmailPassword} required type="password" name="" id="" />
                <input required type="submit" value="Submit" className="btn btn-primary" />
            </form>
            <h1 className="text-center">Login as User</h1>
            <form onSubmit={handleLoginForm} action="" className="d-flex flex-column justify-content-center align-items-center">
                <input onBlur={handleEmailPassword} required type="email" name="" id="" className="mb-1" />
                <input onBlur={handleEmailPassword} required type="password" name="" id="" />
                <input required type="submit" value="Submit" className="btn btn-primary" />
            </form>
            <br />
            <button onClick={handleGmailSignIn} className="btn btn-primary d-block mx-auto">Login with Gmail</button>
            <button onClick={handleFacebookSignIn} className="btn btn-primary d-block mx-auto">Login with Facebook</button>
        </div>
    );
};

export default Login;