
const TableRoutes = ({routes}) => {
    return (
        <div>
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-info rounded shadow-sm">
                <i className="fas fa-2x fa-arrows-alt-v mr-2"></i>
                <div className="lh-100">
                    <h6 className="mb-0 text-white lh-100">{routes.origin}</h6>
                    <h6 className="mb-0 text-white lh-100">{routes.destination}</h6>
                </div>
            </div>

            <div className=" bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Rutas</h6>
                {
                    [1,2,3].map((i, index) => (
                    <div className="text-muted pt-3" key={index}>
                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong className="d-block text-gray-dark">ruta {i}</strong>
                            Donec id elit non mi porta gravida at eget metus.
                        </p>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TableRoutes
