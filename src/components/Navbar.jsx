import { googleLogout } from "@react-oauth/google";
import React from "react";
import { getUser, logout } from "./auth";

const Navbar = () => {
    const logoutB = () => {
        googleLogout();
        logout();
        window.location.reload();
    }
        
    const user = getUser()
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Admin panel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Manage Events<span class="sr-only">(current)</span></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Moblie Notification</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Manage User</a>
                    </li>

                </ul>
                <ul class="navbar-nav navbar-right">
                    <li class="nav-item nav-link" id="name">{user.name}</li>
                    <li class="nav-item nav-link" id="photo">
                        <img src={user.picture} alt="profile" style={{height:'20px',width:'20px'}} />
                    </li>

                    <li class="nav-item" id="logout">
                        <button class="btn btn-primary" href="javascript:void(0);" onClick={logoutB}>Sign out</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;