import React, { useState } from 'react';
import initialization from './../../firebase/firebaseInitialize';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

initialization();
const Register = () => {
    const auth = getAuth();
    const [user, getUser] = useState({
        displayName: '',
        email: '',
        isRegistered: false
    });
    const [pass, getPass] = useState();
    const [error, setError] = useState("");

    const handleInput = e => {
        if (e.target.type === 'text')
            user['displayName'] = e.target.value
        else if (e.target.type === 'email')
            user['email'] = e.target.value
        else
            getPass(e.target.value)
    }

    const handleRegistrationForm = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, user?.email, pass)
            .then(response => {
                user['isRegistered'] = true;
                setError('');
                sendVerification();
            })
            .catch(error => {
                setError(error.message)
            })
    }
    const sendVerification = () => {
        sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
        });
    };
    return (
        <>
            <h1 className="text-center text-light">Register</h1>
            {error.length ? <p className="h6 text-muted">{error}</p> : ''}
            <form onSubmit={handleRegistrationForm}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input onBlur={handleInput} type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input onBlur={handleInput} type="email" class="form-control" />
                    <span id="emailHelp" class="form-text">We'll never share your email with anyone else.</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input onBlur={handleInput} type="password" class="form-control" />
                    <span id="passwordHelpInline" class="form-text">Must be 6-20 characters long.</span>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Register;