const getUser = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    }

    return null;
}

const isLogged = () => {
    return !!localStorage.getItem('user');
}

const saveuser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("ts24token");
}

const getToken = () => {
    return localStorage.getItem("ts24token");
}

export { getUser, isLogged, saveuser, logout,getToken };