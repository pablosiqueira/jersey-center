import Nav from 'react-bootstrap/Nav';
import classes from './TopBar.module.css'
import NavDropdown from 'react-bootstrap/NavDropdown';

const CategoriesBar = () => {
    const ctgs = ['jerseys','clubs','countries','brands']
    const devCtgs = [
      {name: 'Add Jersey', link: '/dev/add'},
      {name: 'Edit Jersey', link: '/dev/edit/jerseys'},
      {name: 'Edit Country', link: '/dev/edit/countries'},
      {name: 'Edit Brand', link: '/dev/edit/brands'},
      {name: 'Edit Club', link: '/dev/edit/clubs'},
    ]

    return (
      <Nav className='me-auto my-2 my-lg-0 justify-content-center' variant="pills" defaultActiveKey="/">
        {
            ctgs.map(item => {
                return <Nav.Item key={item}>
                <Nav.Link href={"/" + item} className={classes.ctglink}>{item}</Nav.Link>
              </Nav.Item>
            })
        }
        <NavDropdown
              id="nav-dropdown-dark-example"
              title="DEV"
              menuVariant="dark"
              className={classes.ctglink}
            >
              {devCtgs.map(item => {
                return <NavDropdown.Item key={item.name} href={item.link} className={classes.ctglink}>{item.name}</NavDropdown.Item>
              })}
            </NavDropdown>
    </Nav>)
}

export default CategoriesBar