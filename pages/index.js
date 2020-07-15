import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

 
export default function Home() {
    const [listPost, setlistPost] = useState([])

    useEffect(() => {
      axios('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then(res =>{
          setlistPost(res.data)
          console.log('res ', res )
        })
    }, [])
    
    
  return (
    <>
      <div className="form-routes my-5">
        <div className="text-center mb-4">
          <h1 className="h1 mb-3 font-weight-normal">Buscar Rutas</h1>
          <p>
            Busca ubicaciones y visualiza las rutas entre ellas
          </p>
        </div>

        <Link href="/map">
          <a className="btn btn-lg btn-primary btn-block" >Ir al mapa</a>
        </Link>
      </div>

      <div className="album py-3 bg-light">
        <div className="container">
          <h2 className="h2 my-4">
            Implemetación de axios con datos de <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder</a>
          </h2>
          <div className="row">
            {
              listPost.map((i, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4 shadow-sm">
                    <img src={i.thumbnailUrl} className="bd-placeholder-img card-img-top"/>
                    <div className="card-body">
                      <p className="card-text">{i.title}</p>
                      <div className="d-flex justify-content-end align-items-center">
                        
                        <small className="text-muted">{i.id}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
