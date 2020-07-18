const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Challenge = require("../models/challenge");

router.post("/challenges", auth, async (req, res) => {
  const challenge = new Challenge({
    ...req.body,
    owner: req.user._id
  });
  try {
    await challenge.save();
    res.status(201).send(challenge);
  } catch (e) {
    res.send(e);
  }
});

// GET /challenges?completed=true
// GET /challenges?limit=10&skip=0
// GET /challenges?sortBy=createdAt:desc
router.get("/challenges", auth, async (req, res) => {
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
        path: "challenges",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.challenges);
  } catch (e) {
    res.status(200).send(e);
  }
});

router.patch("/challenge/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "completed",
    "action",
    "state"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const challenge = await Challenge.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    updates.forEach(update => (challenge[update] = req.body[update]));
    await challenge.save();
    if (!challenge) {
      res.status(404).send("Unable to find challenge");
    }
    res.send(challenge);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/challenges/:id", auth, async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    console.log(challenge);
    if (!challenge) {
      return res.status(404).send("unable to find challenge");
    }
    res.send(challenge);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
