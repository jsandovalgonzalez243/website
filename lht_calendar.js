"use strict";

/*
   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 10
   Tutorial Case

   Author: Jorge Sandoval Gonzalez
   Date: November 30, 2025

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// old date
// var thisDay = new Date("September 24, 2021");
// current date
var thisDay = new Date();

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// collects other commands to create the calendar
function createCalendar(calDate) {
    var calendarHTML = "<table id='calendar_table'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calWeekdayRow();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

// make the caption for the calendar
function calCaption(calDate) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var thisMonth = calDate.getMonth();

    var thisYear = calDate.getFullYear();

    return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>"
}

// make the weekday row
function calWeekdayRow() {
    var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    var rowHTML = "<tr>";
    for (var i = 0; i < dayName.length; i++) {
        rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
    }

    rowHTML += "</tr>";
    return rowHTML;
}

// get how many days in a month there is
function daysInMonth(calDate) {
    var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];

    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();

    // leap year stuff
    if (thisYear % 4 === 0) {
        if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
            dayCount[1] = 29;
        }
    }

    return dayCount[thisMonth];
}

function calDays(calDate) {
    // determine starting day
    var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    var weekDay = day.getDay();

    // draw blanks before starting day
    var htmlCode = "<tr>";
    for (var i = 0; i < weekDay; i++) {
        htmlCode += "<td></td>";
    }

    // write cells for each day
    var totalDays = daysInMonth(calDate);

    var highlightDay = calDate.getDate();
    for (var i = 1; i <= totalDays; i++) {
        day.setDate(i);
        weekDay = day.getDay();

        if (weekDay === 0) htmlCode += "<tr>";
        if (i === highlightDay) {
            htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
        } else {
            htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
        }
        if (weekDay === 6) htmlCode += "<tr>";
    }

    return htmlCode;
}