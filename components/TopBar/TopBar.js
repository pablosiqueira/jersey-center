import classes from './TopBar.module.css'
import Navbar from "react-bootstrap/Navbar"
import {VscJersey} from 'react-icons/vsc'
import Container from 'react-bootstrap/Container'
import CategoriesBar from './CategoriesBar'
import SearchBar from './SearchBar'

const TopBar = (props) => {
    return(
        <>
    <Navbar variant='dark' expand="lg" className={classes.topbar}>
      <Container fluid>
        <Navbar.Brand href="/" className='d-flex align-items-center'><VscJersey color='#CCAD8F' size='2.5rem'/> <span>Jersey Database</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <CategoriesBar />  
          <SearchBar category='jerseys' mode='nav'/>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default TopBar