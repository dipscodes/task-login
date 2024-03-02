import { useState } from 'react';
import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clientPromise from "../lib/mongodb";

export default function CreateTask( {username, created} ) {
  
  
  const router = useRouter()
	const msg = router.query
  const [taskname, setTaskname] = useState(msg.Taskname);
  const [taskdesc, setTaskdesc] = useState(msg.Taskdesc);
  const [duedate, setDuedate] = useState(msg.Duedate);

  const handleTaskname = (e) => {
    setTaskname(e.target.value);
  };
  const handleTaskdesc = (e) => {
    setTaskdesc(e.target.value);
  };
  const handleDuedate = (e) => {
    setDuedate(e.target.value);
  };
	return (
    <Layout pageTitle="Create Task">
			<Link className="h-[50px] w-auto pt-10 text-3xl" href="/">Home</Link><br/>
			<h2 className="h-[50px] mt-5 text-2xl my-5">Update Task</h2>
			<form action='/api/updateTask' method='POST'>
				<input minLength="1" name="taskname" id="taskname" type="text" placeholder='Task Name' value={taskname} onChange={handleTaskname} required></input><br/>
				<input minLength="1" name="taskdesc" id="taskdesc" type="text" placeholder='Description' value={taskdesc} onChange={handleTaskdesc} required></input><br/>
				<input name="duedate" id="duedate" type="date" placeholder='Due Date' value={duedate} onChange={handleDuedate} required className="text-white-950 px-5 py-3 border-2 border-green-500 rounded-3xl mb-5 bg-black " ></input><br/>
        <input type="hidden" name="taskid" id="taskid" value={msg._id}></input><br/>
				<input type="submit" value="Update Task"/>
			</form>
		</Layout>
	);
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/task"
            }
        }
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db.collection("Profiles").find({"Username": username}).toArray();
    const userdoc = users[0]
    const created = userdoc['Created']
    return {
      props: {username: username, created: created},
    }
}