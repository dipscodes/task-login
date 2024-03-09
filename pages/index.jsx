import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

export default function HomePage( {username} ) {
    return (
        <Layout pageTitle="Home">
        {username ?
        <>
            <h2 className="w-auto h-[80px] text-3xl py-2 block text-center">Hi {username}</h2>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/profile">My Profile</a>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/tasks">All Tasks</a>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/createTask">Create a Task</a>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/api/logout">Logout</a>
        </>: 
        <div className="">
            <h2 className="w-auto h-[80px] text-3xl py-2 block text-center">Task Manager</h2>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/login">Login</a>
            <a className="w-auto h-auto text-2xl py-1 block text-center" href="/signup">Signup</a>

        </div>
        }
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};