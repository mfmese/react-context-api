import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Navbar = ({title}) => {
    return (

        <div>
            <nav className="navbar-nav navbar expand-lg navbar-dark bg-dark mb-3 p-3">
                <a href="/" className="navbar-brand">{title}</a>
                
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to = '/' className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to = '/about' className="nav-link">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

Navbar.propTypes = {
    //Bu bileşen string ve zorunlu olarak title değerini almak zorunda anlamına gelir. title gönderilmezse tarayıcı console'da hata görürsünüz.
    title: PropTypes.string.isRequired 
}
Navbar.defaultProps = {
    //eğer title değeri bu bileşene gönderilmezse title props değeri default olarak "Default App" değerini alır
    title: "Default App"
}
export default Navbar
