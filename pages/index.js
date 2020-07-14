import {useEffect, useRef, useState} from 'react'
import { useForm } from "react-hook-form";

import TableRoutes from '../components/TableRoutes'
 
export default function Home() {
    const myMap = useRef(null);
    const [routes, setRoutes] = useState(null)
    const [showNav, setShowNav] = useState(true)
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
      
      if (routes) {
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
      <div className="row" style={{ height: '100vh' }} >
        <main role="main" className={`ml-sm-auto order-md-2 ${showNav? 'col-lg-9 col-md-8':'col-md-12'}`}>
          <div className="w-100 h-100"ref={myMap}></div>
        </main>

        {
          showNav ? 
        <nav className="col-md-4 col-lg-3 d-md-block pr-0 order-md-1 animate__animated animate__fadeInLeft">
          <div className="pt-2 ml-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <h2>
                  Maps
                </h2>
              </li>
              <li className="nav-item">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>¿De dónde sales?</label>
                      <input type="text" placeholder="Origen" className="form-control" name="origin"
                        ref={register({ required: true })} />
                        {errors.origin && <small className="text-danger">Este campo es requerido</small>}
                    </div>
                    <div className="form-group">
                      <label>¿A dónde te diriges?</label>
                      <input type="text" placeholder="Destino" className="form-control" name="destination"
                        ref={register({ required: true })} />
                        {errors.destination && <small className="text-danger">Este campo es requerido</small>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Buscar Ruta</button>
                </form>
              </li>

              {
                routes &&
                <li className="nav-item mt-3">
                  <TableRoutes routes={routes}/>
                </li>
              }

              <li className="nav-item mt-3">
                <button type="buttom" onClick={()=>setShowNav(!showNav)}  className="btn btn-primary ml-3">
                  <i className="fas fa-lg fa-chevron-circle-left"></i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        :
        <button type="buttom" onClick={()=>setShowNav(!showNav)} className="btn btn-primary pl-3" style={{position: 'fixed', bottom: '120px', left: '-2px'}}><i className="fas fa-lg fa-chevron-circle-right"></i>
        </button>
        }
      </div>
    </>
  )
}
