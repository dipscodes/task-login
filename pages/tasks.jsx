import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";

export default function ProfilePage( {username, tasks} ) {
	return (
		<Layout pageTitle="Tasks">
			<Link href="/">Home</Link><br/>
			<h2>{username}'s Tasks</h2>
			<p>List of Tasks</p>
			<div className='w-full flex flex-row justify-center'>
			{JSON.parse(tasks).map((item, index) => 
				(<div
						key={`${item}-${index}`}
						className="w-1/2 search-selection"
					>
						<div
							className="w-auto item outsight"
						></div>
						<div
							className="w-auto h-[100px] border-2 border-solid border-blue-200 items-center pl-3 pr-5 flex flex-row justify-start rounded-md hover:bg-slate-700 cursor-pointer"
						>
							<div
								role="textbox"
								className="px-1 mx-3 w-full h-[20px] text-white focus:outline-none text-2xl flex flex-row justify-start items-center bg-transparent whitespace-nowrap"
							>
									<span
										className="highlight rounded-md px-2 ml-1"
									>
									</span>
							</div>
							<div className="flex flex-col h-full justify-evenly">
								<RxCrossCircled
									size={35}
									className="cursor-pointer text-slate-400"
									onClick={() => closeOption(index)}
								/>
								<HiOutlineDuplicate
									size={35}
									className="cursor-pointer text-slate-400"
									onClick={() => duplicateIdea(index)}
								/>
							</div>
						</div>
					</div>)
			)}
			</div>
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