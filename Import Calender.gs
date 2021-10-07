function myFunction() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet(),
      cals = ['dmkq7n6l0j2l70im0k3k4dpnp4@group.calendar.google.com','453q541klh0b6hgqf08pofkmrc@group.calendar.google.com','4414qahl234ja2tqkis166ekoc@group.calendar.google.com','b2taqn5o7so7e8vrfh9079sjj0@group.calendar.google.com', 'dmkq7n6l0j2l70im0k3k4dpnp4@group.calendar.google.com','ka68l2romo79as7udijuo5lres@group.calendar.google.com','8i0qv8mn7duv94645julqk8q9s@group.calendar.google.com'], c, cal, calName,
      
      events, i, details,
      eventslog = [], e,
      rows = [], range;

  for (c = 0; c < cals.length; c += 1) {

    cal = CalendarApp.getCalendarById(cals[c]);
    calName = cal.getTitle();
    events = cal.getEventsForDay(new Date)
        // add the events of the current calendar to the array of all events
    eventslog = eventslog.concat(
      events.map(function(event) {
        return {
          time: new Date(event.getStartTime()).getTime(), // sort by this
          details: [
            event.getTitle(),
            event.getStartTime(),
            event.getEndTime(),
            event.getDescription(),
            event.getLocation(),
            calName // change calendar info position in array to suit
          ]
        };
      })
    );
  }

  // sort array of event so date order can be either way by reversing a & b
  eventslog.sort(function(a, b) { return a.time - b.time; });

  rows = eventslog.map(function(entry) { return entry.details; });
  Logger.log(rows);



  
  range = sheet.getRange(rows, 1, 1, 6);
  range.setValues(rows);
}

