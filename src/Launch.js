
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './css/Launch.css';
import TopMenu from './TopMenu';


function Launch() {



    const [launch, setLaunch] = useState();

   const param = useParams();
   
   const getOneLaunch = async () => {
    console.log("ok")
    const api = await fetch(`https://api.spacex.land/rest/launch/${param.id}`);
    const data = await api.json().then(res => res);
    console.log(data);
    setLaunch(data);
    }


   useEffect(() => {
       getOneLaunch();
   },[]);

   const LoadLaunch = () => {
     return (
     <div className='card'>
        <h2>{launch.mission_name}</h2>
        <img src={launch.links.mission_patch} width={"20%"} alt=""/>
        <p>Date de lancement (UTC) : {launch.launch_date_utc}</p>
        <p>Lancé à : {launch.launch_site.site_name_long}</p>
        <p>Type de roquette : {launch.rocket.rocket_name}</p>
        <p></p>
        <img src={launch.links.flickr_images[0]} className="picture" width={"20%"} alt={launch.mission_name}/>
        <img src={launch.links.flickr_images[1]} className="picture" width={"20%"} alt={launch.mission_name}/>
        <img src={launch.links.flickr_images[2]} className="picture" width={"20%"} alt={launch.mission_name}/>
        <h2>Informations sur le premier étage</h2>
        <p>Nombre de missions de ce stage {launch.rocket.first_stage.cores[0].core.missions.length}</p>
        { launch.rocket.first_stage.cores[0].core.missions.map((mission, i) => {
          if(launch.rocket.first_stage.cores[0].core.missions.length > 1) {
            return (
              <Link onClick={() => this.forceUpdate()} to={`/launch/${mission.flight}/`}>
                <h5>{mission.name}</h5>
              </Link>
            );
          }
          return (<div><p>Ce stage n'a été utilisé que pour ce lancement !</p></div>)
        })
        }
     </div>
     
     )
   }
   

  return (
    <div>
      <TopMenu/>
      {launch && <LoadLaunch/>}
    </div>
  )
}

export default Launch