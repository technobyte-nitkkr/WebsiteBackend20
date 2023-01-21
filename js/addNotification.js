$(function () {
  const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api2/";

  //send notification
  let addNotificationUrl = url + "admin/notification";
  let addMobileNoti = url + "admin/mobilenoti";
  //add notice
  $(".addNotice").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    let topic = $(".addNotice").find("#topic").val();
    let title = $(".addNotice").find("#title").val();
    let body = $(".addNotice").find("#body").val();
    let image = $(".addNotice").find("#image").val();
    let link = $(".addNotice").find("#link").val();
    if (body.length != 0) {
      let token = window.localStorage.getItem("jwt");
      let data = {
        notif: body,
        time: Date.now(),
      };
      let data2 = {
        topic: topic,
        title: title,
        body: body,
        image: image,
        link: link
      };

      $.ajax({
        url: addMobileNoti,
        data: data2,
        type: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        success: function (result) {
          console.log(result);
          $(".addNotice")[0].reset();
          alert("Notification added");
        },
        error: function (err) {
            window.alert("Error in addding mobile notification");
          console.log(err);
        }
      });
    } else {
      alert("notification empty");
    }

    //calculate timestamp
  });
});
