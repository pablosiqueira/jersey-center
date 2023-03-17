import Window from "../../components/Window/Window";
import Link from "next/link";
import Head from "next/head";
import {HiOutlineGlobe, HiOutlineNewspaper} from 'react-icons/hi'
import {ImPencil2} from 'react-icons/im'
import {GiSoccerKick, GiNewspaper} from 'react-icons/gi'
import {IoShirtOutline} from 'react-icons/io5'


const DevPage = () => {

    const actionLink = {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginInline: '.5rem'
    }
    
    return(
        <>
        <Head>
            <title>Developer Area</title>
        </Head>
            <Window>
                <h1 className="text-center my-2">Developer Area</h1>        
                <div className={"d-flex text-center flex-wrap pt-3 justify-content-evenly" }>
            <Link href='/dev/add'>
                <a style={actionLink} variant="outline-secondary">
                <IoShirtOutline size='5rem'/>
                    <p>Add Jersey</p> 
                </a>
            </Link>

            <Link href='/dev/edit/jerseys/'>
              <a style={actionLink} variant="outline-secondary">
              <GiNewspaper size='5rem'/>
                <p>Edit Jersey</p>
              </a>
            </Link>

            <Link href='dev/edit/countries'>
              <a style={actionLink} variant="outline-secondary">
              <HiOutlineGlobe size='5rem'/>
                <p>Edit Country</p>
              </a>
            </Link>

            <Link href='/dev/edit/brands'>
              <a style={actionLink} variant="outline-dark">
              <ImPencil2 size='5rem'/>
                <p>Edit Brand</p>
              </a>
            </Link>

            <Link href='/dev/edit/clubs'>
              <a style={actionLink} variant="outline-dark">
              <GiSoccerKick size='5rem'/>
                <p>Edit Team</p>
              </a>
            </Link>
      </div>
            </Window>
        </>
    )
}

export default DevPage