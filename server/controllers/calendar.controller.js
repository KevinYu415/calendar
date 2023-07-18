const CalendarEvent = require("../models/calendar.model");

const createNewCalendarEvent = (req, res) => {
    CalendarEvent.create(req.body)
    .then((CalendarEvent) => {
      res.json({ CalendarEvent });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllCalendarEvent = (req, res) => {
    CalendarEvent.find()
    .then((allCalendarEvent) => {
      res.json(allCalendarEvent);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOneCalendarEvent = (req, res) => {
    CalendarEvent.findOne({ _id: req.params.id })
    .then((queriedEvent) => {
      res.json(queriedEvent);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updateCalendarEvent = (req, res) => {
    CalendarEvent.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedCalendarEvent) => {
      res.json({ updatedCalendarEvent });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteCalendarEvent = (req, res) => {
    CalendarEvent.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewCalendarEvent,
  getOneCalendarEvent,
  getAllCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};