var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "techspardha-live",
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
