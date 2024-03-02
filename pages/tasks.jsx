import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import { RxCrossCircled } from "react-icons/rx";
import { GoPencil  } from "react-icons/go";

export default function ProfilePage( {username, tasks} ) {
	const deleteOption = async (taskid) => {
		if (confirm("Are you sure you want to delete?")) {

			try {
				await fetch('/api/deleteTask', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ taskid: taskid }),
				}).then(response => {
					if (response.ok) window.location.reload();
				});
			} catch (error) {
				console.error('Error:', error);
			}
		}
  };
	const updateTask = async (task) => {
		console.log(task);
		const dataToSend = task;
    const queryParams = new URLSearchParams(dataToSend).toString();
    window.location.href = `/task?${queryParams}`;
  };

	return (
		<Layout pageTitle="Tasks">
			<Link className="w-auto h-[30px] flex flex-row justify-center pt-5 text-3xl" href="/">Home</Link><br/>
			<h2 className="w-auto h-[40px] flex flex-row justify-center items-center text-2xl my-5" >{username}'s Tasks</h2>
			<div className="w-full flex flex-col justify-center mt-5 items-center">
			{JSON.parse(tasks).map((task, index) => 
				(<div
						key={`${task._id}`}
						className="w-1/2 search-selection my-4 min-w-[500px]"
					>
						<div
							className="w-auto item outsight"
						></div>
						<div
							className="w-auto h-[100px] border-2 border-solid border-blue-200 items-center pl-3 pr-5 flex flex-row justify-start rounded-md hover:bg-slate-700 cursor-pointer"
						>
							<div
								role="textbox"
								className="px-1 mx-3 w-full h-[20px] text-white focus:outline-none text-2xl flex flex-col justify-evenly items-start bg-transparent whitespace-nowrap"
							>
									<span
										className="highlight rounded-md px-2 ml-1"
									>
										{task.Taskname}
									</span>
									<span
										className="highlight rounded-md px-2 ml-1"
									>
										{task.Taskdesc}
									</span>
									<span
										className="highlight rounded-md px-2 ml-1"
									>
										{task.Duedate}
									</span>
							</div>
							<div className="flex flex-col h-full justify-evenly">
								<RxCrossCircled
									size={35}
									className="cursor-pointer text-slate-400"
									onClick={() => deleteOption(task._id)}
								/>
								<Link href="/task">
									<GoPencil
									size={30}
									className="cursor-pointer text-slate-400"
									onClick={() => updateTask(task)}
								/>
								</Link>
								
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
	if (username == undefined){
			return {
					redirect: {
							permanent: false,
							destination: "/tasks"
					}
			}
	}
	// var username = getCookie('username', { req, res }); 
	const client = await clientPromise;
	const db = client.db("Tasks");
	const tasks = await db.collection("Tasks").find({"Username": username}).toArray();
	return {
		props: {username: username, tasks: JSON.stringify(tasks)},
	}
}
