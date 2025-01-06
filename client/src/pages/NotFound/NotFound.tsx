import "./NotFound.scss"
import {Link} from "react-router-dom";

export const NotFound = () => {
    return(
        <div className="notfound">
            <div className="notfound-container container">
                <p className="notfound-title">Page not found</p>
                <Link to="/"><button className="notfound-button">Go to Home Page</button></Link>
            </div>
        </div>
    )
}