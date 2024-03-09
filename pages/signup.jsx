import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignupPage( {username} ) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Signup">
            <a className="w-auto h-[80px] text-3xl py-2 block text-center" href="/">Home</a>
            {msg ?
                <h3 className="red">{msg}</h3>
            :
                <></>
            }
            <h2 className="w-auto h-[40px] flex flex-row justify-center items-center text-2xl mb-5">Sign up</h2>
            
            <form action='/api/signup' method='POST'>
                <input minLength="3" name="username" id="username" type="text" placeholder='username' required></input><br/>
                <input minLength="5" name="password" id="password" type="password" placeholder='password' required></input><br/>
                <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder='password again' required></input><br/>
                <input type="submit" value="Signup"/>
            </form>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username != undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {username:false} };
};