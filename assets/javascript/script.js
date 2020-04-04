const $currentDay = $("#currentDay");

function planDay() {
  $(document).ready(function () {
    const main = false;
    const currentDate = moment().format("MMMM Do YYYY");
    const day = moment().isoWeekday();
    const weekArray = [" Sunday", " Monday", " Tuesday"," Wednesday", " Thursday", " Friday", " Saturday"];
    const dayOf = weekArray[day];
    $currentDay.text(currentDate + dayOf);
    let currentDateHour12 = moment().format("h");
    let currentDateHour24 = moment().format("H");

    if (main) {
      currentDateHour12 = 1;
      currentDateHour24 = 13;
    }
    let myData = JSON.parse(localStorage.getItem("myData"));
    if (myData !== null) {
      textArr = myData;
    } else {
      textArr = new Array(12);
      textArr[2] = "Eat";
    }
    let $plannerDiv = $("#plannerContainer");
    $plannerDiv.empty();

    for (let hour = 8; hour <= 20; hour++) {
      let index = hour - 9;

      const $rowDiv = $("<div>");
      $rowDiv.addClass("row plannerRow");
      $rowDiv.attr("hour-index", hour);

      const $timeDiv = $("<div>");
      $timeDiv.addClass("col-md-1");

      const $timeBox = $("<span>");
      $timeBox.attr("class", "timeBox");

      let displayHour = 0;
      let ampm = "";
      if (hour <= 12) {
        displayHour = hour;
        ampm = "am";
      } else {
        displayHour = hour - 12;
        ampm = "pm";
      }

      $timeBox.text(`${displayHour} ${ampm}`);

      $timeDiv.append($timeBox);
      $rowDiv.append($timeDiv);

      const $planDaily = $("<input>");

      $planDaily.attr("id", `input-${index}`);
      $planDaily.attr("class", "planDaily");
      $planDaily.attr("hour-index", index);
      $planDaily.attr("type", "text");

      $planDaily.val(textArr[index]);

      let $inputDiv = $("<div>");
      $inputDiv.addClass("col-md-10");

      $inputDiv.append($planDaily);
      $rowDiv.append($inputDiv);

      const saveIcon = "./assets/images/save-regular.svg";

      const $saveDiv = $("<div>");
      $saveDiv.addClass("col-md-1");

      const $saveBtn = $("<button>");
      $saveBtn.attr("id", `saveid-${index}`);
      $saveBtn.attr("id", "saveBtn");
      $saveBtn.attr("class", "btn btn-info far fa-save saveIcon");
      $saveBtn.attr("type", "button");
      $saveBtn.attr("save-id", index);

      $saveDiv.append($saveBtn);
      $rowDiv.append($saveDiv);

      rowColorUpdate($rowDiv, hour);

      $plannerDiv.append($rowDiv);

      $saveBtn.on("click", function (event) {
        event.preventDefault();

        let $index = $(this).attr("save-id");
        let inputId = "#input-" + $index;
        let $value = $(inputId).val();

        textArr[$index] = $value;

        localStorage.setItem("myData", JSON.stringify(textArr));
      });
    }

    function rowColorUpdate($timeRow, hour) {
      if (hour < currentDateHour24) {
        $timeRow.css("background-color", "#96a1ac");
      } else if (hour > currentDateHour24) {
        $timeRow.css("background-color", "#80df80");
      } else {
        $timeRow.css("background-color", "#f7583b");
      }
    }
  });
}
planDay();
