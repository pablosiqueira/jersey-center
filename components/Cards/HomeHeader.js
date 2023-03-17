import classes from './card.module.css'

const HomeHeader = props => {
    return(
        <div className={classes.divTitle + ' text-center py-4 px-5 mb-4'}>
            <h1>JERSEY DATABASE</h1>
            <h2><b><i>Every Jersey has a story to tell</i></b></h2>
            <h3 className='fw-600'>
              View all about some of the best football jerseys around the world.<br/>
              Total of {props.jerseysSize} jerseys from {props.countrySize} countries.
            </h3>
        </div>
    )
}

export default HomeHeader