const calendarController = require("../controllers/calendar.controller");

module.exports = (app) => {
  app.post("/api/calendar", calendarController.createNewCalendarEvent);
  app.get("/api/calendar", calendarController.getAllCalendarEvent);
  app.get("/api/calendar/:id", calendarController.getOneCalendarEvent);
  app.put("/api/calendar/:id", calendarController.updateCalendarEvent);
  app.delete("/api/calendar/:id", calendarController.deleteCalendarEvent);
};