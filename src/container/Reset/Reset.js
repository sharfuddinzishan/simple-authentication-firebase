import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Reset = () => {
    const auth = getAuth();
    const [email, setEmail] = useState();
    const [error, setError] = useState("");

    const handleInput = e => {
        setEmail(e.target.value)
    }

    const handleResetForm = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(response => {
                setError('');
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <>
            <h1 className="text-center text-light">Rest Panel</h1>
            {error.length ? <p className="h6 text-muted">{error}</p> : ''}
            <form onSubmit={handleResetForm}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input onBlur={handleInput} type="email" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Reset</button>
            </form>
        </>
    );
};

export default Reset;