// techpardha 1-9
var clouds = ['techspardha1', 'techspardha2', 'techspardha3', 'techspardha4', 'techspardha5', 'techspardha6', 'techspardha7', 'techspardha8', 'techspardha9'];
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: clouds[Math.floor(Math.random() * clouds.length)],
    uploadPreset: "techspardha",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      var securl = result.info.secure_url;
      //   change poster url
      document.getElementById("poster").value = securl;
      // show preview
      document.getElementById("poster-prev").src = securl;
    }
  }
);

function openWidget () {
  myWidget.open();
};
