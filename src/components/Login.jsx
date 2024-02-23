import React, { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin  } from "@react-oauth/google";
import {saveuser} from './auth'
import axios from "axios";

function Login() {
        const onSuccess= async (credentialResponse) => {
            //  get token id
            console.log(credentialResponse);
            const TOKEN = credentialResponse.credential;
            console.log(TOKEN);

            try {
                const response = await axios.post("https://us-central1-techspardha-87928.cloudfunctions.net/api2/login", {
                    idToken: TOKEN,
                });

                const JWT = response.data.data.token;

                // set token in local storage
                saveuser(response.data.data.user);
                localStorage.setItem("ts24token", JWT);
            } catch (error) {
                console.log(error);
            } finally{
                window.location.reload();
            }
        
        // flow: "auth-code",
    }

    return (
        <div className="container Login">
         
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
                    
        </div>
    );
}

export default Login;