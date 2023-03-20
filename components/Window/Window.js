import classes from './Window.module.css'
import Transition from '../Transition/Transition'

const Window = props => {
    return(
        <>
            <Transition>
                <div className={classes.window + ' ' + (props.mode !== 'custom' && 'py-4')}>{props.children}</div>
            </Transition>
        </>
    )
}

export default Window