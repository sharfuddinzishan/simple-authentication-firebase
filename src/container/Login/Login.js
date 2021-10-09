import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const auth = getAuth();
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        isLogin: false
    });
    const [pass, getPass] = useState();
    const [error, setError] = useState("");

    const handleInput = e => {
        if (e.target.type === 'email')
            user['email'] = e.target.value
        else
            getPass(e.target.value)
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user?.email, pass)
            .then(response => {
                const copyUser = {
                    displayName: response.displayName,
                    email: response.email,
                    isLogin: true
                }
                setUser(copyUser);
                setError('');
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <>
            <h1 className="text-center text-light">Login Panel</h1>
            {error.length ? <p className="h6 text-muted">{error}</p> : ''}
            <form onSubmit={handleLoginForm}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onBlur={handleInput} type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onBlur={handleInput} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    );
};

export default Login;