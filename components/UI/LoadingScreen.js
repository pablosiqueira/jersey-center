import Spinner from "react-bootstrap/Spinner"

const LoadingScreen = props => {
    return (
        <div className="my-4 text-center d-block mx-auto" style={{color:'white'}}>
            <Spinner animation="border" role="status" />
            <p>Loading...</p>
        </div>
    )
}

export default LoadingScreen