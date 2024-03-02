import Cookies from "cookies";
import clientPromise from "../../lib/mongodb";
// const { createHash } = require("node:crypto");
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const taskid = req.body["taskid"];
    const client = await clientPromise;
    const cookies = new Cookies(req, res);
    const username = cookies.get("username");
    const db = client.db("Tasks");
    await db.collection("Tasks").deleteOne({ _id: new ObjectId(taskid) });
    cookies.set("username", username);
    res.redirect("/tasks");
  } else {
    res.redirect("/");
  }
}
