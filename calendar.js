(function vanillaJsCalendar() {
  "use strict";

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  document.addEventListener("DOMContentLoaded", function (event) {
    var theDate = new Date();

    var DateObject = function DateObject(theDate) {
      this.theDay = theDate.getDate();
      this.dayName = dayNames[theDate.getDay()];
      this.theMonth = monthNames[theDate.getMonth()];
      this.theYear = theDate.getFullYear();
      this.daysInMonth = new Date(
        theDate.getFullYear(),
        theDate.getMonth() + 1,
        0
      ).getDate();
      this.firstDayOfMonth =
        dayNames[
          new Date(theDate.getFullYear(), theDate.getMonth(), 1).getDay()
        ];
    };

    var currentDate = new DateObject(theDate);

    function renderCalendar(targetElem) {
      function addElem(elementType, elemClass, appendTarget) {
        appendTarget.innerHTML +=
          "<" +
          elementType +
          " class=" +
          elemClass +
          "> </" +
          elementType +
          ">";
      }

      currentDate = new DateObject(theDate);

      var renderTarget = document.getElementById(targetElem);
      renderTarget.remove();
      renderTarget = document.createElement("div");
      renderTarget.id = targetElem;
      document.getElementsByTagName("body")[0].appendChild(renderTarget);

      addElem("div", "day-view", renderTarget);
      var dayView = document.querySelector(".day-view");
      var dayNameElem = document.createElement("div");
      dayNameElem.className = "day-header";
      var dayNameNode = document.createTextNode(currentDate.dayName);
      dayNameElem.appendChild(dayNameNode);
      dayView.appendChild(dayNameElem);
      addElem("time", "day-number", dayView);
      var dayNumber = document.querySelector(".day-number");
      var dayNumNode = document.createTextNode(currentDate.theDay);
      dayNumber.appendChild(dayNumNode);
      dayView.appendChild(dayNumber);

      addElem("div", "month-view", renderTarget);
      var monthView = document.querySelector(".month-view");

      var prevMonthSpan = document.createElement("SPAN");
      prevMonthSpan.addEventListener("click", function () {
        goToMonth(currentDate, false);
      });
      prevMonthSpan.classList.add("arrow", "float-left", "prev-arrow");
      var backArrow = document.createTextNode("<");
      prevMonthSpan.appendChild(backArrow);

      var nextMonthSpan = document.createElement("SPAN");
      nextMonthSpan.addEventListener("click", function () {
        goToMonth(currentDate, true);
      });
      nextMonthSpan.classList.add("arrow", "float-right", "next-arrow");
      var nextArrow = document.createTextNode(">");
      nextMonthSpan.appendChild(nextArrow);

      document.onkeydown = function () {
        switch (window.event.keyCode) {
          case 37:
            goToMonth(currentDate, false);
            break;
          case 39:
            goToMonth(currentDate, true);
            break;
        }
      };

      var monthSpan = document.createElement("SPAN");
      monthSpan.className = "month-header";
      var monthOf = document.createTextNode(
        currentDate.theMonth + " " + currentDate.theYear
      );

      monthSpan.appendChild(prevMonthSpan);
      monthSpan.appendChild(monthOf);
      monthSpan.appendChild(nextMonthSpan);
      monthView.appendChild(monthSpan);

      for (var i = 0; i < dayNames.length; i++) {
        var dayOfWeek = document.createElement("div");
        dayOfWeek.className = "day-of-week";
        var charOfDay = document.createTextNode(dayNames[i].charAt(0));
        dayOfWeek.appendChild(charOfDay);
        monthView.appendChild(dayOfWeek);
      }

      var calendarList = document.createElement("ul");
      for (i = 0; i < currentDate.daysInMonth; i++) {
        var calendarCell = document.createElement("li");
        var calCellTime = document.createElement("time");
        calendarList.appendChild(calendarCell);
        calendarCell.id = "day_" + (i + 1);
        var dayDataDate = new Date(
          theDate.getFullYear(),
          theDate.getMonth(),
          i + 1
        );
        calCellTime.setAttribute("datetime", dayDataDate.toISOString());
        calCellTime.setAttribute(
          "data-dayofweek",
          dayNames[dayDataDate.getDay()]
        );

        calendarCell.className = "calendar-cell";
        if (i === currentDate.theDay - 1) {
          calendarCell.className = "today";
        }
        var dayOfMonth = document.createTextNode(i + 1);
        calCellTime.appendChild(dayOfMonth);
        calendarCell.appendChild(calCellTime);
        monthView.appendChild(calendarList);
      }

      var dayOne = document.getElementById("day_1");
      if (currentDate.firstDayOfMonth == "Monday") {
        dayOne.style.marginLeft = "49px";
      } else if (currentDate.firstDayOfMonth == "Tuesday") {
        dayOne.style.marginLeft = "98px";
      } else if (currentDate.firstDayOfMonth == "Wednesday") {
        dayOne.style.marginLeft = "147px";
      } else if (currentDate.firstDayOfMonth == "Thursday") {
        dayOne.style.marginLeft = "196px";
      } else if (currentDate.firstDayOfMonth == "Friday") {
        dayOne.style.marginLeft = "245px";
      } else if (currentDate.firstDayOfMonth == "Saturday") {
        dayOne.style.marginLeft = "304px";
      }

      var dayHeader = document.getElementsByClassName("day-header");
      var dayNumNode = document.getElementsByClassName("day-number");
      var updateDay = function () {
        var currentToday = document.querySelector(".today");
        if (currentToday) {
          currentToday.classList.remove("today");
        }

        this.classList.add("today");

        var thisCellTime = this.querySelector("time");
        dayHeader[0].textContent = thisCellTime.getAttribute("data-dayofweek");
        dayNumNode[0].textContent = this.textContent;
      };

      var calCells = document.getElementsByClassName("calendar-cell");
      for (i = 0; i < calCells.length; i++) {
        calCells[i].addEventListener("click", updateDay, false);
      }
    }

    renderCalendar("calendarThis");

    function goToMonth(currentDate, direction) {
      if (direction == false) {
        theDate = new Date(theDate.getFullYear(), theDate.getMonth() - 1, 1);
      } else {
        theDate = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 1);
      }
      return renderCalendar("calendarThis");
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const fallingClocks = document.getElementById("falling-clocks");

  function createClock() {
    const clock = document.createElement("div");
    clock.classList.add("clock");

    // Randomize the clock's horizontal position and animation duration
    clock.style.left = `${Math.random() * 100}%`;
    clock.style.animationDuration = `${3 + Math.random() * 5}s`;
    clock.style.opacity = Math.random() * 0.5 + 0.5;

    fallingClocks.appendChild(clock);

    // Remove the clock once the animation ends
    clock.addEventListener("animationend", () => {
      clock.remove();
    });
  }

  // Generate clocks at regular intervals
  setInterval(createClock, 1500);
});
