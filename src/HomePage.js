import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './css/HomePage.css';
import TopMenu from './TopMenu';

function HomePage() {

    const [launches, setLaunches] = useState([]);
    const [nextLaunch, setNextLaunch] = useState();

    const getLaunches = async () => {
        const api = await fetch(`https://api.spacex.land/rest/launches-past/`);
        const data = await api.json();
        console.log(data.length);

        setLaunches(data);
    }

    const getNextLaunch = async () => {
        console.log("ok")
        const api = await fetch(`https://api.spacex.land/rest/launch-next/`);
        const data = await api.json().then(res => res);
        console.log(data.id);
        setNextLaunch(data);
    }

    useEffect(() => {
         getLaunches();
         getNextLaunch();
    }, [])

    const LoadNextLaunch = () => {
        return (
        
        <div className='launch-card'>
                <h2>{nextLaunch?.mission_name ?? "Pas encore chargé"}</h2>
                <p>Date de lancement (UTC) : {nextLaunch?.launch_date_utc ?? "Pas encore chargé"}</p>
                <Link to={`/launch/${nextLaunch?.id ?? "Pas encore chargé"}/`}>
                    <img src={nextLaunch?.links.mission_patch ?? "Pas encore chargé"} width={"20%"} alt=""/>
                </Link>

            </div>
            
        
        )
    };


    return (
        <div className='HomePage'>
            <TopMenu/>
            <h1>Coucou et Bienvenue sur spaceX APP !</h1>
            <h4 className='subtext'>Vous pouvez cliquer sur un patch pour afficher plus d'infos sur un lancement.</h4>
            <h2>Voici le prochain lancement de spaceX !</h2>
            {nextLaunch && <LoadNextLaunch/>}
            

            
            <h2>Voici les 3 derniers lancements !</h2>
            {launches.map((launch, i) => {
                console.log(i);
                if (((launches.length - 3) < launch.id) && (launch.id !== nextLaunch.id)) {
                    return(
                        <div>
                            
                            <div className='launch-card' key={i}>
                                
                                <h2>{launch.mission_name}</h2>
                                <Link to={`/launch/${launch.id}/`} className="launch-link">
                                <p>Date de lancement (UTC) : {launch.launch_date_utc}</p>
                                
                                <img src={launch.links.mission_patch} width={"20%"} alt=""/>
                                </Link>

                            </div>
                        </div>
                    );
                }
                else return null;
            })}

        </div>
    );
}

export default HomePage;