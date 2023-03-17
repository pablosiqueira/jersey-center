import Link from "next/link"
import {GoGlobe} from 'react-icons/go'
import {IoShieldHalfOutline} from 'react-icons/io5'
import {BsFillGearFill} from 'react-icons/bs'
import {MdOutlineSportsSoccer} from 'react-icons/md'
import classes from './List.module.css'


const ActionsList = () => {
    return(
    <>
        <div className={"d-flex text-center flex-wrap pt-3 " + classes.actionsSection}>
            <Link href='/clubs'>
                <a className={classes.actionLink} variant="outline-secondary">
                <IoShieldHalfOutline size='5rem'/>
                    <p>Clubs</p> 
                </a>
            </Link>

            <Link href='/brands'>
              <a className={classes.actionLink} variant="outline-secondary">
              <MdOutlineSportsSoccer size='5rem'/>
                <p>Brands</p>
              </a>
            </Link>

            <Link href='/countries'>
              <a className={classes.actionLink} variant="outline-secondary">
              <GoGlobe size='5rem'/>
                <p>Countries</p>
              </a>
            </Link>

            <Link href='/dev'>
              <a className={classes.actionLink} variant="outline-dark">
              <BsFillGearFill size='5rem'/>
                <p>Developer Tools</p>
              </a>
            </Link>

      </div>
    </>
    )
}

export default ActionsList