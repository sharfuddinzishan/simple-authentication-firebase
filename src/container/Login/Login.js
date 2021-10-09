import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const auth = getAuth();
    const [user, getUser] = useState({
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
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input onBlur={handleInput} type="email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input onBlur={handleInput} type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </>
    );
};

export default Login;