// Sign out the user
function signOut() {
    // clear local storage
    localStorage.clear();
    window.localStorage.clear();
    window.document.cookie = "";
    window.location="/login.php";
  }