import React, { useState } from 'react';
import initialization from './../../firebase/firebaseInitialize';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

initialization();
const Register = () => {
    const auth = getAuth();
    const [user, setUser] = useState({
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
                const copyUser = {
                    displayName: user.displayName,
                    email: user.email,
                    isLogin: true
                }
                setUser(copyUser);
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
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input onBlur={handleInput} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onBlur={handleInput} type="email" className="form-control" />
                    <span id="emailHelp" className="form-text">We'll never share your email with anyone else.</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onBlur={handleInput} type="password" className="form-control" />
                    <span id="passwordHelpInline" className="form-text">Must be 6-20 characters long.</span>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Register;