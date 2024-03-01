import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CreateTask( {username} ) {
    const router = useRouter()
    const { msg } = router.query
    console.log(msg);
    return (<></>);
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username');
    // console.log(username);
    // if (username != undefined){
    //     return {
    //         redirect: {
    //             permanent: false,
    //             destination: "/createTask"
    //         }
    //     }
    // }
    return { props: {username:false} };
};