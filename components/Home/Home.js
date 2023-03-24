import ActionsList from "../List/ActionsList"
import Head from "next/head"
import CardGrid from "../Cards/CardGrid"
import Container from "react-bootstrap/Container"
import HomeHeader from "./HomeHeader"
import Link from "next/link"
import Button from "react-bootstrap/Button"
import classes from './Home.module.css'

const Home = (props) => {
    return (
      <>
        <Head>
          <title>Jersey Database</title>
          <link rel="icon" type="icon" sizes="16x16" href='/favicon.ico'></link>
        </Head>
        <div >

                <HomeHeader jerseysSize={props.jerseysSize} countrySize={props.countrySize}/>

            <CardGrid items={props.jerseys} category='jerseys' mode='home'/>
            <Container className="text-center">
                <Link href='/jerseys' legacyBehavior><Button size="lg" className={'mb-4 ' + classes.viewAllBtn} variant="outline-secondary">View All</Button></Link>
            </Container>   
            <ActionsList />
        </div>
      </>
    )
}

export default Home