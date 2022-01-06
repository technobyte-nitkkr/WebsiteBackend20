// Sign out the user
function signOut() {
    // clear local storage
    console.log("signout");
    localStorage.clear();
    window.localStorage.clear();
    Cookies.remove("jwt", { path: "/", domain: document.domain });
    // remove jwt from local storage
    window.location.reload();
  }