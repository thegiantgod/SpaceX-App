import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './css/HomePage.css';

function TopMenu () {

    const url = useLocation();
    return (
        <div className='top-menu'>
                <Link to={`/`} className={url.pathname === `/` ? 'current': null}><h5>Page d'accueuil</h5></Link>
                <Link to={`/launches/`} className={url.pathname === `/launches/` ? 'current': null}><h5>Tous les lancements</h5></Link>
        </div>
    )
};

export default TopMenu;