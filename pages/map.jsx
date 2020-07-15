import {useEffect, useRef, useState} from 'react'

import TableRoutes from '../components/TableRoutes'
import Sidebar from '../components/Sidebar'
 
export default function Map() {
    const myMap = useRef(null);
    const sidebar = useRef(null);
    const [routes, setRoutes] = useState(null)
    const [routesResult, setRoutesResult] = useState(null)
    const [showNav, setShowNav] = useState(true)

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
    
    
  return (
    <>
      <div className="row m-0 " style={{ height: '100vh' }} >
        <main role="main" className={`p-0 ml-sm-auto order-md-2 ${showNav ? 'col-lg-9 col-md-8':'col-md-12'} ${showNav && 'd-none d-md-block d-xl-block'}`}>
          <div className="w-100 h-100" ref={myMap}></div>
        </main>

        {
          showNav ?
            <nav className="container col-md-4 col-lg-3 d-md-block p-0 order-md-1 animate__animated animate__fadeInLeft" ref={sidebar}>
              <Sidebar showNav={showNav} setShowNav={setShowNav} setRoutes={setRoutes} routesResult={routesResult} routes={routes}>
                <TableRoutes routes={routesResult}/>
              </Sidebar>
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
