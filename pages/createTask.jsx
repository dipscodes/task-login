import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clientPromise from "../lib/mongodb";

export default function CreateTask( {username, created} ) {

	const router = useRouter()
	const { msg } = router.query
	return (
		<Layout pageTitle="Create Task">
			<Link className="h-[50px] w-auto pt-10 text-3xl" href="/">Home</Link><br/>
			{msg ?
				<h3 className="red">{msg}</h3>
			:
				<></>
			}
			<h2 className="h-[50px] mt-5 text-2xl">Create a Task</h2>
			<form action='/api/createTask' method='POST'>
				<input minLength="1" name="taskname" id="taskname" type="text" placeholder='Task Name' required></input><br/>
				<input minLength="1" name="taskdesc" id="taskdesc" type="text" placeholder='Description' required></input><br/>
				<input name="duedate" id="duedate" type="date" placeholder='Due Date' required className="text-neutral-950 p-3 border-2 rounded-md mb-5"></input><br/>
				<input type="submit" value="Create Task"/>
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
                destination: "/createTask"
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