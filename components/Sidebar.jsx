import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Sidebar = ({showNav, setShowNav, routes, setRoutes, routesResult, children}) => {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter()

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
                            {children}
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
    )
}

export default Sidebar
