const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Habit = require("../models/habit");

router.post("/habits", auth, async (req, res) => {
  const habit = new Habit({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await habit.save();
    res.status(201).send(habit);
  } catch (e) {
    res.send(e);
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get("/habits", auth, async (req, res) => {
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
    await req.user
      .populate({
        path: "habits",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.habits);
  } catch (e) {
    res.status(200).send(e);
  }
});

router.get("/habit/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const habit = await Habit.findOne({ _id, owner: req.user._id });
    if (!habit) {
      return res.status(404).send("Unable to find habit");
    }
    res.send(habit);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/habit/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "duration",
    "completed",
    "state",
    "name",
    "color",
    "repeat",
    "time",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    updates.forEach((update) => (habit[update] = req.body[update]));
    await habit.save();
    if (!habit) {
      res.status(404).send("Unable to find habit");
    }
    res.send(habit);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/habit/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    console.log("req.user._id");
    if (!habit) {
      return res.status(404).send("unable to find habit");
    }
    res.send(habit);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
