import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import clientPromise from "../lib/mongodb";

export default function ProfilePage( {username, tasks} ) {
	return (
		<Layout pageTitle="Tasks">
			<Link href="/">Home</Link><br/>
			<h2>{username}'s Tasks</h2>
			<p>List of Tasks</p>
			<>
			{JSON.parse(tasks).map((item, index) => 
				(<div key={item.password_hash}><p>{JSON.stringify(item)}</p><br/></div>)
			)}
			</>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const req = context.req
	const res = context.res
	var username = getCookie('username', { req, res });
	const client = await clientPromise;
	const db = client.db("Tasks");
	const tasks = await db.collection("Tasks").find({"Username": username}).toArray();
	return {
		props: {username: username, tasks: JSON.stringify(tasks)},
	}
}