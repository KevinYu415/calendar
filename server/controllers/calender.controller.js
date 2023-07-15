const NoteWall = require("../models/calender.model");

const createNewNoteWall = (req, res) => {
    NoteWall.create(req.body)
    .then((noteWall) => {
      res.json({ noteWall });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllNoteWall = (req, res) => {
    NoteWall.find()
    .then((allNoteWall) => {
      res.json(allNoteWall);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOneNoteWall = (req, res) => {
    NoteWall.findOne({ _id: req.params.id })
    .then((queriedAuthor) => {
      res.json(queriedAuthor);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updateNoteWall = (req, res) => {
    NoteWall.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedNoteWall) => {
      res.json({ updatedNoteWall });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteExistingUser = (req, res) => {
    NoteWall.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewNoteWall,
  getOneNoteWall,
  getAllNoteWall,
  updateNoteWall,
  deleteExistingUser,
};