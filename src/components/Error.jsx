import { googleLogout } from '@react-oauth/google';
import React from 'react';
import { logout } from './auth';

const Error = () => {
    const signOut = () => {
        googleLogout();
        logout()
    }

    return (
        <div>
            <div class="container text-center my-5">
                <h1> you are not Authrised to visit the resources </h1>
                <h2>Please sign in with admin or manager account</h2>

                <button class="btn btn-primary" href="javascript:void(0);" onClick={signOut}>Sign out</button>
            </div>

        </div>
    );
}

export default Error;
