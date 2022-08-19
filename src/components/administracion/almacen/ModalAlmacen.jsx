import { Modal } from "react-bootstrap";

function ModalAlmacen({ show, onHide }) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      backdrop="static"
      keyboard={false}
      // dialogClassName="modal-admin"
      size="xl"
    >
      <div className="container-fluid main">
        <div className="row">
          <div className="col-md-12 col-md-12 p-1 d-flex bg-success justify-content-between">
            <h3>Almacén</h3>
            <button className="btn btn-danger" type="button" onClick={onHide}>
              Cerrar
              <i className="bi bi-x-circle ms-2"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <nav className="col-md-12 p-1">
            <div className="nav nav-pills mb-1" role="tablist">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#almacenes"
                type="button"
                role="tab"
                aria-controls="almacenes"
                aria-selected="true"
              >
                Almacenes
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#compuestos"
                type="button"
                role="tab"
                aria-controls="compuestos"
                aria-selected="false"
              >
                Compuestos
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#categorias"
                type="button"
                role="tab"
                aria-controls="compuestos"
                aria-selected="false"
              >
                Categorías
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#productos"
                type="button"
                role="tab"
                aria-controls="compuestos"
                aria-selected="false"
              >
                Productos
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#estadistica"
                type="button"
                role="tab"
                aria-controls="compuestos"
                aria-selected="false"
              >
                Estadística
              </button>
            </div>
          </nav>
          <div className="row">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="almacenes"
                role="tabpanel"
                aria-labelledby=""
              >
                <h1>almacenes</h1>
              </div>
              <div
                className="tab-pane fade"
                id="compuestos"
                role="tabpanel"
                aria-labelledby=""
              >
                <h1>compuestos</h1>
              </div>
              <div
                className="tab-pane fade"
                id="categorias"
                role="tabpanel"
                aria-labelledby=""
              >
                <h1>categorías</h1>
              </div>
              <div
                className="tab-pane fade"
                id="productos"
                role="tabpanel"
                aria-labelledby=""
              >
                <h1>productos</h1>
              </div>
              <div
                className="tab-pane fade"
                id="estadistica"
                role="tabpanel"
                aria-labelledby=""
              >
                <h1>Estadística</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalAlmacen;