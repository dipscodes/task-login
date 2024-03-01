import Cookies from 'cookies';
import clientPromise from "../../lib/mongodb";
const {createHash} = require('node:crypto');

export default async function handler(req, res) {
  if (req.method == "POST"){
    const taskname = req.body['taskname'];
    const taskdesc = req.body['taskdesc'];
    const duedate = req.body['duedate'];

    const cookies = new Cookies(req, res)
    const username = cookies.get('username')

    const client = await clientPromise;
    const db = client.db("Tasks");
    const currentDate = new Date().toUTCString();
    const bodyObject = {
        Username: username,
        Created: currentDate,
        Taskname: taskname,
        Taskdesc: taskdesc,
        Duedate: duedate
    }
    await db.collection("Tasks").insertOne(bodyObject);
    cookies.set('username', username)
    res.redirect("/tasks")
  } else {
    res.redirect("/")
  }
}