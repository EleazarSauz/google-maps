import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

 
export default function Home() {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter()


    
    const onSubmit = data => {

      console.log(data)
      router.push('/map')
      // fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key='+process.env.API_KEY)
      // .then(ok=>ok.json())
      // .then(data=>console.log('data ', data ))
      // .catch(err=>console.log(err))
    };
    
  return (
    <>
      <form className="form-routes" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Buscar Rutas</h1>
          <p>
            Busca ubicaciones y visualiza las rutas entre ellas
          </p>
        </div>

        <div className="form-label-group">
          <input type="text" placeholder="Origen" className="form-control" name="origin"
                        ref={register({ required: true })} />
          <label>Origen</label>
        </div>

        <div className="form-label-group">
          <input type="text" placeholder="Destino" className="form-control" name="destination"
                        ref={register({ required: true })} />
          <label>Destino</label>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Buscar rutas</button>
        <p className="mt-5 mb-3 text-muted text-center">© 2017-2020</p>
      </form>
    </>
  )
}
