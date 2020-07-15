
const TableRoutes = ({routes}) => {
    return (
        <div>
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-info rounded shadow-sm">
                <i className="fas fa-2x fa-arrows-alt-v mr-2"></i>
                <div className="lh-100">
                    <h6 className="mb-0 text-white lh-100">{routes.request.origin.query}</h6>
                    <hr/>
                    <h6 className="mb-0 text-white lh-100">{routes.request.destination.query}</h6>
                </div>
            </div>

            <div className=" bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Rutas</h6>
                {
                    routes.routes.map((i, index) => (
                    <div className="text-muted py-3 d-flex align-items-center border-bottom border-gray" key={index}>
                        <button type="buttom"  className="btn btn-secondary">
                            <i className="fas fa-lg fa-route"></i>
                        </button>
                        <p className="media-body ml-3 mb-0 small lh-125">
                        <strong className="d-block text-gray-dark">Distancia {i.legs[0].distance.text}</strong>
                        <strong className="d-block text-gray-dark">Tiempo {i.legs[0].duration.text}</strong>
                            
                        </p>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TableRoutes
