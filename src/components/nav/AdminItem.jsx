import { useState } from "react";
import { appContext } from "../../context/MainContext";
import Operadores from "../administracion/operadores/Operadores";

function AdminItem() {
  const { session } = appContext();
  const [modalOperadores, setModalOperadores] = useState(false);

  const targetModalOperadores = () => {
    setModalOperadores(true);
  };
  return (
    <>
      <li className="nav-item dropdown">
        <a
          disabled={session.rol === "master" ? false : true}
          href="#"
          className="nav-link dropdown-toggle fs-5 text-dark"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Administración
        </a>
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item fs-5 py-2">
            Almacén
          </a>
          <a href="#" className="dropdown-item fs-5 py-2">
            Clientes
          </a>
          <a
            onClick={targetModalOperadores}
            href="#"
            className="dropdown-item fs-5 py-2"
          >
            Operadores
          </a>
          <a href="#" className="dropdown-item fs-5 py-2">
            Tickets
          </a>
          <a href="#" className="dropdown-item fs-5 py-2">
            Caja
          </a>
        </div>
      </li>
      <Operadores
        show={modalOperadores}
        onHide={() => setModalOperadores(false)}
      />
    </>
  );
}

export default AdminItem;
