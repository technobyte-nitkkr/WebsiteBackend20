window.onload = function () {
  var jwt = localStorage.getItem("jwt");
  if (jwt == null) {
  } else {
    var name = localStorage.getItem("name");
    var email = localStorage.getItem("email");
    var photo = localStorage.getItem("photo");

    var img = document.createElement("img");
    img.src = photo;
    img.style.height = "35px";
    img.style.width = "35px";
    img.style.borderRadius = "50%";

    document.getElementById("name").innerHTML = name;
    document.getElementById("name").appendChild(img);
    document.getElementById("logout").style.display = "block";
  }
};
