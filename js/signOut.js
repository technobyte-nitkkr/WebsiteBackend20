// Sign out the user
function signOut() {
    // clear local storage
    console.log("signout");
    localStorage.clear();
    window.localStorage.clear();
    Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
        console.log(cookieName);
    });
    // remove jwt from local storage
    window.location.reload();
  }