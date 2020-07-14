import {useEffect, useRef, useState} from 'react'
import { useForm } from "react-hook-form";

 
export default function Home() {
    const myMap = useRef(null);
    const [routes, setRoutes] = useState(null)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const { register, handleSubmit, errors } = useForm();
    
    useEffect(() => {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      console.log('window.google.maps', google.maps)
      
      var mapOptions = {
        zoom: 11,
        // new google.maps.LatLng(19.4326, -99.1332);
        center: {
          lat: 19.4326, 
          lng: -99.1332
        }
      };
      var map = new google.maps.Map(myMap.current, mapOptions);
      directionsRenderer.setMap(map);
      
      if (origin.length > 0  && destination.length > 0) {
        directionsService.route(routes, function(result, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(result);
          }
        });
      }
    }, [routes])
    
    const onSubmit = data => {
      console.log(data)
      setRoutes({
        origin: data.origin,
        destination: data.destination,
        travelMode: 'DRIVING'
      })
    };
    
  return (
    <>
      <div className="row">
        <nav className="col-md-4 col-lg-3 d-md-block collapse pr-0">
          <div className="pt-4">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Rutas
                </a>
              </li>
              <li className="nav-item">
                <form className="ml-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>¿De dónde sales?</label>
                      <input type="text" placeholder="Origen" className="form-control" name="origin"
                        onChange={e => setOrigin(e.target.value)} ref={register({ required: true })} />
                        {errors.origin && <small className="text-danger">Este campo es requerido</small>}
                    </div>
                    <div className="form-group">
                      <label>¿A dónde te diriges?</label>
                      <input type="text" placeholder="Destino" className="form-control" name="destination"
                        onChange={e => setDestination(e.target.value)} ref={register({ required: true })} />
                        {errors.destination && <small className="text-danger">Este campo es requerido</small>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Buscar Ruta</button>
                </form>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-8 ml-sm-auto col-lg-9">
          <div className="w-100" style={{ height: '100vh' }} ref={myMap}></div>
        </main>
      </div>
    </>
  )
}
