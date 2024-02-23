import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
    const onSuccess = (response) => {
        console.log("Login Success:", response);
        const id_token = response.accessToken;
        const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api2/";
        const loginUrl = url + "loginApp";

        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: id_token }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    const jwt = result.data.token;
                    // set jwt in cookie with path
                    console.log(result.data);
                    const user = result.data.user;
                    console.log(user);
                    const { role } = user;
                    window.localStorage.setItem("jwt", jwt);
                    window.localStorage.setItem("name", user.name);
                    window.localStorage.setItem("email", user.email);
                    window.localStorage.setItem("photo", user.photo);
                    window.localStorage.setItem("role", role);
                    window.location.href = "/";
                } else {
                    alert("Login Failed");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Login Failed");
            });
    };

    const onFailure = (error) => {
        console.log("Login Failed:", error);
        alert("Login Failed");
    };

    useEffect(() => { }, []);

    return (
        <div className="containerLogin">
            <center>

                <GoogleLogin
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />

            </center>
        </div>
    );
}

export default Login;