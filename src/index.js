const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const ChallengeRouter = require("./routers/challenge");
var cors = require("cors");
var bodyParser = require("body-parser");

// const cron = require("node-cron");
// const sendBirthdayMessage = () => {
//   console.log("I love you 💻");
// };

// // schedule takes two arguments, cron time and the task to call when we reach that time
// cron.schedule("26 11 * * *", sendBirthdayMessage);

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(ChallengeRouter);

app.listen(port, () => {
  console.log("server is running on port" + port);
});
