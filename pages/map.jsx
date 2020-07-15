import {useEffect, useRef, useState} from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

import TableRoutes from '../components/TableRoutes'
 
export default function Map() {
    const myMap = useRef(null);
    const sidebar = useRef(null);
    const [routes, setRoutes] = useState(null)
    const [routesResult, setRoutesResult] = useState(null)
    const [showNav, setShowNav] = useState(true)
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter()

    useEffect(() => {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      
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
            console.log('result', result)
            setRoutesResult(result)

            directionsRenderer.setDirections(result);
            result.routes.forEach(i => {
              console.log('routes', i)
              var polyline = new google.maps.Polyline({
                path: i.overview_path,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map
              });
              polyline.setMap(map);
              
            });
          } else {
            setRoutesResult(null)
          }
        });
      }
    }, [routes])
    
    const onSubmit = data => {
      console.log(data)

      setRoutes({
        origin: data.origin,
        destination: data.destination,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      })
    };
    
  return (
    <>
      <div className="row m-0 " style={{ height: '100vh' }} >
        <main role="main" className={`p-0 ml-sm-auto order-md-2 ${showNav ? 'col-lg-9 col-md-8':'col-md-12'} ${showNav && 'd-none d-md-block d-xl-block'}`}>
          <div className="w-100 h-100" ref={myMap}></div>
        </main>

        {
          showNav ?
            <nav className="container col-md-4 col-lg-3 d-md-block p-0 order-md-1 animate__animated animate__fadeInLeft" ref={sidebar}>
            <div className="pt-2 pb-5 mx-2 container-sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item my-3">
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=>router.push('/')}>
                            <i className="fas fa-lg fa-home"></i>
                        </button>
                    </li>

                    <li className="nav-item d-flex">
                        <button type="button" onClick={()=>setShowNav(!showNav)} className="btn btn-primary">
                            <i className="fas fa-lg fa-chevron-circle-left"></i>
                        </button>
                        <h2 className="ml-3">
                            Buscar rutas
                        </h2>
                    </li>

                    <li className="nav-item mt-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                            <label>¿De dónde sales?</label>
                            <input type="text" placeholder="Origen" className="form-control" name="origin"
                                ref={register({ required: true })} />
                                {errors.origin && <small className="text-danger">Punto de origen requerido</small>}
                            </div>
                            <div className="form-group">
                            <label>¿A dónde te diriges?</label>
                            <input type="text" placeholder="Destino" className="form-control" name="destination"
                                ref={register({ required: true })} />
                                {errors.destination && <small className="text-danger">Punto de destino requerido</small>}
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Buscar Ruta</button>
                        </form>
                    </li>

                    {
                        routesResult &&
                        <li className="nav-item mt-3">
                        <TableRoutes routes={routesResult}/>
                        </li>
                    }
                    {
                        !routesResult && routes &&
                        <li className="nav-item mt-3">
                        <div className="alert alert-danger">
                            Rutas no encontradas D:
                        </div>
                        </li>
                    }
                </ul>
            </div>
            </nav>
            :
            <div className="animate__animated animate__fadeInLeft" style={{position: 'fixed', bottom: '120px', left: '-2px'}}>
                <button type="buttom" onClick={()=>setShowNav(!showNav)} className="btn btn-primary pl-3">
                    <i className={`fas fa-lg fa-chevron-circle-${showNav?'left':'right'}`}></i>
                </button>
            </div>
        }
      </div>
    </>
  )
}
