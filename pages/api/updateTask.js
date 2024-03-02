import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const taskname = req.body["taskname"];
    const taskdesc = req.body["taskdesc"];
    const duedate = req.body["duedate"];
    const taskid = req.body["taskid"];

    const cookies = new Cookies(req, res);
    const username = cookies.get("username");
    const currentDate = new Date().toUTCString();
    const bodyObject = {
      Username: username,
      Created: currentDate,
      Taskname: taskname,
      Taskdesc: taskdesc,
      Duedate: duedate,
    };
    console.log(req.body);

    const client = await clientPromise;
    const db = client.db("Tasks");
    await db
      .collection("Tasks")
      .updateOne({ _id: new ObjectId(taskid) }, { $set: bodyObject });
    cookies.set("username", username);
    res.redirect("/tasks");
  } else {
    res.redirect("/");
  }
}
