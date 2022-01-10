$(function () {
  const $form = $("#events");

  //reset form
  function resetForm() {
    $form[0].reset();
    $form.find(".hold_rules").html("");
    $form.find(".hold_coordinators").html("");
    $form.find("#category").trigger("change");
  }

  let $coordinator = $(".coordinator").detach();
  let $rule = $(".rule_container").detach();

  //add categories to options list
  const url = "https://techspardhabackend.herokuapp.com/";
  const requestCategoriesUrl = url + "events/categories";
  const requestEventsUrl = url + "events";

  function refresh_events() {
    let events;

    $.get(requestEventsUrl, function (result) {
      let data = result.data;
      events = data;

      $("#search_category").on("change", function () {
        let option = $(this).find("option:selected").val();
        let eventList = [];
        eventList = events.events.filter(function (event) {
          if (event.eventCategory === option) return true;
        });
        let $event = $("#event").html("");
        eventList.forEach(function (event) {
          let $option = $(
            "<option value=" +
              event.eventName.replace(/ /g, "$") +
              ">" +
              event.eventName +
              "</option>"
          );
          $event.append($option);
        });
      });
      $("#search_category").trigger("change");
      $(".search-form #event-search").removeAttr("disabled");
    });
  }

  $.get(requestCategoriesUrl, function (result) {
    let data = result.data;
    let categories = data.categories;
    let categoriesHTML =
      "<option value='select' selected>select category</option>";
    for (let value of categories) {
      categoriesHTML =
        categoriesHTML +
        "<option value='" +
        value.replace(/ /g, "$") +
        "'>" +
        value +
        "</option>";
    }

    //document.getElementById('category').innerHTML = categoriesHTML;
    $("#search_category, #category").each(function () {
      $(this).html(categoriesHTML);
    });
    //populate event select
    refresh_events();
  });

  //switch add and update
  const $navbar = $("nav");
  $navbar.on("click", "li", function () {
    $(this).removeClass("btn-secondary");
    $(this).addClass("btn-primary active");
    $(this).siblings("li").removeClass("active btn-primary");
    $(this).siblings("li").addClass("btn-secondary");
    if ($(this).is("#update")) {
      $(".search-form").css("display", "block");
      $(".heading").text("Update Event");
      $form.find("#category").attr("disabled", true);
      $form.find("#event_name").attr("disabled", true);
      refresh_events();
    } else {
      $(".search-form").css("display", "none");
      $(".heading").text("Add Event");
      $form.find("#category").removeAttr("disabled");
      $form.find("#event_name").removeAttr("disabled");
    }

    resetForm();
  });

  //add rules and coordinators
  const $cor_container = $("#coordinators .hold_coordinators");
  $("#add_person").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let $newCoordinator = $coordinator.clone();
    $newCoordinator.find(".close_modal").on("click", function (e) {
      $(this).parent().remove();
    });
    $cor_container.prepend($newCoordinator);
  });
  const $rules_container = $("#rules_container .hold_rules");
  $("#add_rules").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let $newRule = $rule.clone();
    $newRule.find(".close_modal").on("click", function (e) {
      $(this).parent().remove();
    });
    $rules_container.prepend($newRule);
  });

  //category validator
  $("#category").on("change", function (e) {
    let val = $(this).find("option:selected").val();
    if (!(val === "select")) {
      $(this).removeClass("invalid");
      $(this).next("small").removeClass("invalid-text");
    } else {
      $(this).addClass("invalid");
      $(this).next("small").addClass("invalid-text");
    }
  });

  //handle submit construct json object
  $("#events").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($("#category").hasClass("invalid")) {
      alert("select a category");
    } else {
      let jsonForm = {
        category: "",
        eventName: "",
        flagship: false,
        startTime: null,
        endTime: null,
        venue: "",
        description: "",
        rules: [],
        coordinators: [],
        file: null,
      };

      const $form = $("#events");
      jsonForm.category = $form.find("#category").val();
      jsonForm.eventName = $form.find("#event_name").val();
      jsonForm.flagship = $form
        .find("#flagship")
        .find('input[name="flagship"]:checked')
        .val();
      jsonForm.startTime = new Date(
        $form.find("#startDate").val() + " " + $form.find("#startTime").val()
      ).getTime();
      jsonForm.endTime = new Date(
        $form.find("#endDate").val() + " " + $form.find("#endTime").val()
      ).getTime();
      jsonForm.venue = $form.find("#venue").val();
      jsonForm.description = $form.find("#event_description").val();
      jsonForm.coordinators = [];
      $form.find(".coordinator").each(function () {
        let name = $(this).find(".coordinator_name").val();
        let number = $(this).find(".coordinator_number").val();
        jsonForm.coordinators.push({
          coordinator_name: name,
          coordinator_number: number,
        });
      });
      jsonForm.rules = [];
      $form.find(".rule_container").each(function () {
        jsonForm.rules.push($(this).find(".rule").val());
      });
      jsonForm.file = $form.find("#file").val();
      let finalForm = { eventData: jsonForm };
      let requestPostUrl = url + "events";

      let token = window.localStorage.getItem("jwt");
      $.ajax({
        url: requestPostUrl,
        data: finalForm,
        type: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        success: function (result, status) {
          if (status == "success") {
            alert("Data input Successful");
          }

          //clearing form
          resetForm();
        },
      });
    }
  });

  //to get event eventData
  const requestEventDataUrl = url + "events/description";
  //let eventData = "No event present with specified parameters"
  function getEventData(eventCategory, eventName) {
    $("#events").css("opacity", "0.4");
    let eventData = {};
    return new Promise(function (res) {
      $.get(
        requestEventDataUrl,
        { eventCategory: eventCategory },
        function (result) {
          let data = result.data;
          let allData = data.events;
          for (let value of allData) {
            if (value.eventName === eventName) {
              eventData = value;
              break;
            }
          }

          resetForm();
          res(eventData);
        }
      );
    });
  }

  //getEventData('coding', 'gamestation');
  function getDateTime(timestamp) {
    let myDate = {
      date: null,
      time: null,
    };

    let date = timestamp.toLocaleDateString();
    let z = date.split("/");
    z.reverse();
    if (z[1].length == 1) {
      z[1] = "0" + z[1];
    }

    if (z[2].length == 1) {
      z[2] = "0" + z[2];
    }

    //swap month and date to match html date format
    let m = z[1];
    z[1] = z[2];
    z[2] = m;
    myDate.date = z.join("-");
    myDate.time = timestamp.toTimeString().slice(0, 8);

    return myDate;
  }

  //update functionality
  $(".search-form").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let eventCategory = $(
      ".search-form #search_category option:selected"
    ).val();
    let eventName = $(".search-form #event option:selected").val();
    getEventData(
      eventCategory.replace(/\$/g, " "),
      eventName.replace(/\$/g, " ")
    )
      .then(function (event) {
        console.log(event, "the event");
        $("#events").css("opacity", "1");
        $form.find("#category").val(event.eventCategory);
        $form.find("#category").removeClass("invalid");
        $form.find("#category").next("small").removeClass("invalid-text");
        $form.find("#event_name").val(event.eventName);
        let flagship = event.flagship != undefined ? event.flagship : false;
        $form
          .find("#flagship")
          .find('input:radio[name="flagship"]')
          .filter('[value="' + flagship + '"]')
          .attr("checked", true);
        $form.find("#venue").val(event.venue);
        $form.find("#event_description").val(event.description);
        $form.find("#file").val(event.file);
        if (event.coordinators != undefined) {
          event.coordinators.forEach(function (coordinator) {
            let $c = $coordinator.clone();
            $c.find(".coordinator_name").val(coordinator.coordinator_name);
            $c.find(".coordinator_number").val(coordinator.coordinator_number);
            $c.find(".close_modal").on("click", function (e) {
              $(this).parent().remove();
            });
            $cor_container.append($c);
          });
        }

        if (event.rules != undefined) {
          event.rules.forEach(function (rule) {
            let $r = $rule.clone();
            $r.find(".rule").val(rule);
            $r.find(".close_modal").on("click", function (e) {
              $(this).parent().remove();
            });
            $rules_container.append($r);
          });
        }

        //calculating dates

        let startTimestamp = new Date(event.startTime);
        let start = getDateTime(startTimestamp);
        $form.find("#startDate").val(start.date);
        $form.find("#startTime").val(start.time);
        let endTimeStamp = new Date(event.endTime);
        let end = getDateTime(endTimeStamp);
        $form.find("#endDate").val(end.date);
        $form.find("#endTime").val(end.time);
      })
      .catch(function (e) {
        console.log(e);
      });
  });
});
