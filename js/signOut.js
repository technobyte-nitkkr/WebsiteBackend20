// Sign out the user
async function signOut() {
  // clear local storage
  console.log("signout");
  localStorage.clear();
  window.localStorage.clear();
  // clear cookies
  await Cookies.remove("jwt", { path: "/", domain: document.domain });

  window.location.href = "/";
}
