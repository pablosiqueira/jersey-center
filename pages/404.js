import Window from "../components/Window/Window"
import Head from "next/head"
import {BiError} from 'react-icons/bi'
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/router" 

//'https://raw.githubusercontent.com/pablosiqueira/data/main/jersey_db/backgrounds/cr7.webp'
const NotFoundPage = () => {
    const styles = {
        background: 'url(https://raw.githubusercontent.com/pablosiqueira/data/main/jersey_db/backgrounds/cr7_2.webp)',
        backgroundSize: 'cover',
        minHeight: '500px',
        color: 'black',
        borderRadius: '25px',
        textShadow: '0 0 20px #000'
    }
    const router = useRouter()
    return(
        <>
        <Head>
            <title>404 - Page Not Found</title>
        </Head>
        <Window mode='custom'>
            <div className="text-center d-flex flex-column justify-content-center" style={styles}>
                <div className="text-uppercase">
                <BiError className="d-block mx-auto" size='10rem'/>
                <h1><b>Code 404</b></h1>
                <h3>Page Not Found</h3>
                <Button variant="dark" onClick={router.back}>Go Back</Button>
                </div>
            </div>   
        </Window>
        </>
    )
}

export default NotFoundPage