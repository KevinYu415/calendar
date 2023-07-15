const calenderController = require("../controllers/calender.controller");

module.exports = (app) => {
  app.post("/api/calender", calenderController.createNewNoteWall);
  app.get("/api/calender", calenderController.getAllNoteWall);
  app.get("/api/calender/:id", calenderController.getOneNoteWall);
  app.put("/api/calender/:id", calenderController.updateNoteWall);
  app.delete("/api/calender/:id", calenderController.deleteExistingUser);
};