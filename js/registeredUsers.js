$(function () {
  const url = "https://techspardhabackend.herokuapp.com/";
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
        value.replace(/ /g, "+") +
        "'>" +
        value +
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
