const { ObjectId, MongoClient } = require("mongodb");

const connectionURL = process.env.MONGODB_URL;
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect database");
    }
    const db = client.db(databaseName);

    db.collection("tasks")
      .updateMany(
        {
          completed: false
        },
        { $set: { completed: true } }
      )
      .then(result => {
        console.log(result.modifiedCount);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
