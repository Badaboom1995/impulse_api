const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Template = require("../models/habitTemplate");

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get("/templates", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const templates = await Template.find({}, function (err, templates) {
      var templateMap = {};
      templates.forEach(function (template) {
        templateMap[template._id] = template;
      });
    });
    res.send(templates);
  } catch (e) {
    res.status(200).send(e);
  }
});

module.exports = router;
