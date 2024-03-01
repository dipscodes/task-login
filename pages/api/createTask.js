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
    // const users = await db.collection("Profiles").find({"Username": username}).toArray();
    // if (users.length > 0){
    //     res.redirect("/signup?msg=A user already has this username");
    //     return;
    // }
    // const password_hash = createHash('sha256').update(password).digest('hex');
    const currentDate = new Date().toUTCString();
    const bodyObject = {
        Username: username,
        // Password: password_hash,
        Created: currentDate,
        Taskname: taskname,
        Taskdesc: taskdesc,
        Duedata: duedate
    }
    await db.collection("Tasks").insertOne(bodyObject);
    // const cookies = new Cookies(req, res)
    cookies.set('username', username)
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}