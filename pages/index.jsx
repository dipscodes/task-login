import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

export default function HomePage( {username} ) {
    return (
        <Layout pageTitle="Home">
        {username ?
        <>
            <h2 className="m-2 text-3xl">Hi {username}</h2>
            <Link href="/profile" className="m-2 text-2xl">Profile</Link><br/>
            <Link href="/tasks" className="m-2 text-2xl">All Tasks</Link><br/>
            <Link href="/createTask" className="m-2 text-2xl">Create a Task</Link><br/>
            <Link href="/api/logout" className="m-2 text-2xl">Logout</Link>
        </>: 
        <>
            <h2 className="m-2 text-3xl">Task Manager</h2>
            <Link className="m-2 text-2xl" href="/login">Login</Link><br/>
            <Link className="m-2 text-2xl" href="/signup">Signup</Link>
        </>
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