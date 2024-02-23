import React from "react";

const Navbar = () => {
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
                    <li class="nav-item" id="name"></li>
                    <li class="nav-item" id="photo"></li>

                    <li class="nav-item" id="logout">
                        <button class="btn btn-primary" href="javascript:void(0);" onclick="signOut();">Sign out</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;