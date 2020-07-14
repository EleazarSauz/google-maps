import {useEffect, useRef} from 'react'

 
export default function Home() {
    const myMap = useRef(null);

    useEffect(() => {
      console.log('window.google.maps', google.maps)
      var uluru = {lat: -25.344, lng: 131.036};
      var map = new google.maps.Map(myMap.current, {zoom: 11, center: uluru});
      var request = {
        query: 'hotel',
        fields: ['name', 'geometry'],
      };
      
      var service = new google.maps.places.PlacesService(map);
    
      service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('results', results)
          for (var i = 0; i < results.length; i++) {
            new google.maps.Marker({position: results[i].geometry.location, map: map});
          }
          map.setCenter(results[0].geometry.location);
        }
      });
    }, [])

    
  return (
    <>
      <div className="row">
        <nav id="sidebarMenu" className="col-md-4 col-lg-3 d-md-block collapse pr-0">
          <div className="sidebar-sticky pt-4">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Rutas
                </a>
              </li>
              <li className="nav-item">
                <form className="ml-2" onSubmit={e => {
                  e.preventDefault()
                  console.log('e.target', e.target)
                }}>
                    <div className="form-group">
                        <label>¿De dónde sales?</label>
                        <input type="text" placeholder="Origen" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label>¿A dónde te diriges?</label>
                        <input type="text" placeholder="Destino" className="form-control" id="exampleInputPassword1"/>
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
