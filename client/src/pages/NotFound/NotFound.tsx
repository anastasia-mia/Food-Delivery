import "./NotFound.scss"
import {Link} from "react-router-dom";

export const NotFound = () => {
    return(
        <div className="notfound">
            <div className="notfound_container container">
                <p className="notfound_title">Page not found</p>
                <Link to="/"><button className="notfound_button">Go to Home Page</button></Link>
            </div>
        </div>
    )
}