import "./NotFound.scss"
import {Link} from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop.ts";

export const NotFound = () => {
    useScrollToTop();

    return(
        <div className="notfound">
            <div className="notfound-container container">
                <p className="notfound-title">Page not found</p>
                <Link to="/"><button className="notfound-button">Go to Home Page</button></Link>
            </div>
        </div>
    )
}