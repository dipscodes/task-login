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
			<a className="w-auto h-[80px] text-3xl py-2 block text-center" href="/">Home</a>
			{msg ?
				<h3 className="red">{msg}</h3>
			:
				<></>
			}
			<h2 className="w-auto h-[40px] flex flex-row justify-center items-center text-2xl mb-5">Create a Task</h2>
			<form action='/api/createTask' method='POST'>
				<input minLength="1" name="taskname" id="taskname" type="text" placeholder='Task Name' required></input><br/>
				<input minLength="1" name="taskdesc" id="taskdesc" type="text" placeholder='Description' required></input><br/>
				<input name="duedate" id="duedate" type="date" placeholder='Due Date' required className="text-white-950 px-5 py-3 border-2 border-green-500 rounded-3xl mb-5 bg-black "></input><br/>
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
