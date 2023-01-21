$(function () {
  const url = "https://us-central1-techspardha-87928.cloudfunctions.net/api2/";
  const requestCategoriesUrl = url + "events/categories";
  let token = localStorage.getItem("jwt");
  $.get(requestCategoriesUrl, function (result) {
    let data = result.data;
    let categories = data.categories;
    let categoriesHTML;
    for (let value of categories) {
      categoriesHTML =
        categoriesHTML +
        "<option value='" +
        value.categoryName.replace(/ /g, "+") +
        "'>" +
        value.categoryName +
        "</option>";
    }

    document.getElementById("category").innerHTML = categoriesHTML;

    const requestEventsUrl = url + "events";
    let events;

    $.get(requestEventsUrl, function (result) {
      let data = result.data;
      events = data;
      //console.log(events);

      $("#category").on("change", function () {
        let option = $(this).find("option:selected").val();
        let eventList = [];
        eventList = events.events.filter(function (event) {
          if (event.eventCategory === option) return true;
        });
        let $event = $("#event").html("");
        eventList.forEach(function (event) {
          let $option = $(
            "<option value=" +
              event.eventName.replace(/ /g, "+") +
              ">" +
              event.eventName +
              "</option>"
          );
          $event.append($option);
        });
      });
      $("#category").trigger("change");
      $("#search-event .search").removeAttr("disabled");
    });
  });

  function returnData(data, fileName) {
    x = new CSVExport(data, fileName);
    console.log("downloaded");
    return false;
  }

  function registeredData(data) {
    return new Promise(function (res) {
      let registered = [];

      let i = 0;
      if (data.users != undefined && data.users.length != 0) {
        data.users.forEach(function (user, i) {
          let userdata = {
            sr: i + 1,
            name: user.name,
            email: user.email,
            phone: user.phone,
            college: user.college.replace(/,/, " "),
            year: user.year,
          };
          registered.push(userdata);
        });
      }

      res(registered);
    });
  }

  function sendmail(mail)
  {
    let token = localStorage.getItem("jwt");
     $.ajax({
      url:
        url +
        "admin/mail/category",
      type: "POST",
      cache: false,
      data : mail,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
      success: function (mydata) {
        console.log(mydata);
        alert("Mail Sent");
        window.location.reload();
      },
      error: function (mydata) {
        console.log(mydata);
        alert("Mail not sent");
        window.location.reload();
      }
    });
    // reload
  }

  $("#search-event").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let eventCategory = $("#search-event #category")
      .find("option:selected")
      .val();
    let eventName = $("#search-event #event").find("option:selected").val();
    $("#download").attr("disabled", true);
    console.log(eventCategory, eventName);
    $.ajax({
      url:
        url +
        "admin/event?eventCategory=" +
        eventCategory +
        "&eventName=" +
        eventName,
      type: "GET",
      cache: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
      success: function (mydata) {
        $("#information").html(
          mydata.data.users.length +
            " have registered for " +
            eventCategory.replace(/\+/g, " ") +
            " > " +
            eventName.replace(/\+/g, " ")
        );
        $("#download").off("click");

        registeredData(mydata.data).then(function (users) {
          console.log(users);
          $("#send_email").removeAttr("disabled");
          // add on click event to email button
          $("#send_email").on("click", function () {
            $("#email_form").removeAttr("hidden");
            $("#send_email").attr("disabled", true);
          });
          $(".emailForm").on("submit", function (e) {
            e.preventDefault();
            e.stopPropagation();
            // get the form values

            let subject = $(".emailForm").find("#subject").val();
            let heading = $(".emailForm").find("#heading").val();
            let buttontext = $(".emailForm").find("#buttontext").val();
            let buttonlink = $(".emailForm").find("#buttonlink").val();
            let thankyou = $(".emailForm").find("#thankyou").val();
            let detail = $(".emailForm").find("#detail").val();

            // check if anyting is empty
            if (
              subject == "" ||
              heading == "" ||
              buttontext == "" ||
              buttonlink == "" ||
              thankyou == "" ||
              detail == ""
            ) {
              alert("Please fill all the fields");
              return false;
            }

            let mail = {
              subject: subject,
              heading: heading,
              buttontext: buttontext,
              buttonlink: buttonlink,
              thankyou: thankyou,
              detail: detail,
              eventCategory: eventCategory,
              eventName: eventName,
            };
            sendmail(mail);
          });

          $("#download").removeAttr("disabled");
          $("#download").text(
            "download " + eventName.replace(/\+/g, " ") + " participant list"
          );
          $("#download").on("click", function () {
            let fileName =
              eventCategory + "_" + eventName + "_participant_list";
            fileName.replace(/ /g, "-");
            returnData(users, fileName);
          });
        });
      },
    });
  });
});
