import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

let con_ins;

export default {
  connect (callback) {
    client
      .connect()
      .then((connection) => {
        con_ins = connection.db("Feb2"); //Name here
        console.log("connected to mongodb");
        callback();
      })
      .catch((err) => {
        con_ins = undefined;
        console.log(err);
      });
  },
  connection ()  {
    return con_ins;
  }
}