import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './css/HomePage.css';
import TopMenu from './TopMenu';

function LaunchPage() {

    const [launches, setLaunches] = useState([]);
    let [page, setPage] = useState();

    useEffect(() => {
         getLaunches();
         setPage(1);
    }, [])
    const getLaunches = async () => {
        console.log("ok")
        const api = await fetch(`https://api.spacex.land/rest/launches/`);
        const data = await api.json();


        setLaunches(data);
    }

    
    return (
        <div className='LaunchesPage'>
            <TopMenu/>
            <h1>Voici tous les lancements à ce jour :</h1>
            <h4 className='subtext'>Vous pouvez cliquer sur un patch pour afficher plus d'infos sur un lancement.</h4>
            {launches.map((launch, i) => {
                if ((page*10 > i) && (page*10-11 < i)) {
                    return(
                        <div className='launch-card' key={i}>
                            <h2>{launch.mission_name}</h2>
                            <p>Date de lancement (UTC) : {launch.launch_date_utc}</p>
                            <Link to={`/launch/${launch.id}/`}>
                            <img src={launch.links.mission_patch} width={"20%"} alt=""/>
                            <tr></tr>
                            </Link>
    
                        </div>
                           
                    );
                }
                
            })}
            <button onClick={page !== 1 ? () => setPage(page--) : null} className="page-choose">Avant</button>
            <h5 className="page-choose" id='page-number'>{page}</h5>
            <button onClick={page*10 <= launches.length ? () => setPage(page++) : null} className="page-choose">Après</button>

        </div>
    );
}

export default LaunchPage;