import classes from './Window.module.css'

const Window = props => {
    return(
        <>
            <div className={classes.window + ' ' + (props.mode !== 'custom' && 'py-4')}>{props.children}</div>
        </>
    )
}

export default Window