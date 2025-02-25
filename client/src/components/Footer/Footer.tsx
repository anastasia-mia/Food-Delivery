import './Footer.scss'
import {Link} from "react-router-dom";

export const Footer = () => {

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-container">
                    <Link to="/admin" className="footer-admin">Admin Panel</Link>
                    <p className="footer-name">Anastasia Mianovska</p>
                    <p  className="footer-rights">© 2025 All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}