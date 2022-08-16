import { useState, useEffect } from "react";
import routes from "../assets/routes";
import io from "socket.io-client";

export const initialCuenta = {
  folio: 0,
  orden: 0,
  torreta: "",
  personas: 1,
  servicio: "",
  clienteId: null,
  estado: "abierto",
  motivoCancelado: "",
  impreso: false,
  items: [],
  cashInfo: {
    importe: 0,
    dscto: 0,
    total: 0,
    efectivo: 0,
    tarjeta: 0,
    cambio: 0,
  },
  cardInfo: { porcentaje: 0, importe: 0, total: 0 },
  otroMedio: { medio: null, total: 0 },
  createdBy: "",
  repartidor: "",
  closedAt: "",
  time: "",
  fecha: "",
  obs: "",
};

let url, urlSocket;
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3100/cuentas";
  urlSocket = "http://localhost:3100";
} else {
  url = "/cuentas";
  urlSocket = "/";
}

const socket = io(urlSocket);

function useCuenta() {
  const [cuentas, setCuentas] = useState([]);
  const [cuenta, setCuenta] = useState(initialCuenta);
  const [cuentaId, setCuentaId] = useState("");
  const [cuentaOcupada, setCuentaOcupada] = useState("");

  useEffect(() => {
    cargarCuentas();
  }, []);

  useEffect(() => {
    const recebirNuevaCuenta = (newCuenta) => {
      const newCuentas = [...cuentas, newCuenta];
      setCuentas(newCuentas);
    };

    const recebirUpdatedCuenta = (newCuenta) => {
      const chagedCuentas = cuentas.map((cuenta) => {
        if (cuenta._id === newCuenta._id) {
          cuenta = newCuenta;
        }
        return cuenta;
      });
      setCuentas(chagedCuentas);
    };

    const recebirCuentaOcupada = (id) => {
      setCuentaOcupada(id);
    };

    socket.on("newCuenta", recebirNuevaCuenta);
    socket.on("updatedCuenta", recebirUpdatedCuenta);
    socket.on("cuentaOcupada", recebirCuentaOcupada);

    return () => {
      socket.off("newCuenta", recebirNuevaCuenta);
      socket.off("updatedCuentas", recebirUpdatedCuenta);
      socket.off("cuentaOcupada", recebirCuentaOcupada);
    };
  }, [cuentas]);

  const cargarCuentas = async () => {
    const data = await routes.get(url + "/activas");
    setCuentas(data);
  };

  const createCuenta = async (body) => {
    const data = await routes.post(url, body);
    const newCuentas = [...cuentas, data];
    setCuenta(data);
    setCuentas(newCuentas);
    socket.emit("newCuenta", data);
    socket.emit("cuentaOcupada", data._id);
    return { res: true, data };
  };

  const updateCuenta = async (id, body) => {
    const data = await routes.put(url + "/" + id, body);
    const chagedCuentas = cuentas.map((cuenta) => {
      if (cuenta._id === id) {
        cuenta = data;
      }
      return cuenta;
    });
    setCuentas(chagedCuentas);
    setCuenta(data);
    socket.emit("updatedCuenta", data);
    return true;
  };

  const getCuentasByFechas = async (gte, lte) => {
    const data = await routes.get(url + "/porfechas/" + gte + "/" + lte);
    return data;
  };

  const reiniciarCuenta = () => {
    setCuenta(initialCuenta);
    setCuentaId("");
    socket.emit("cuentaOcupada", "");
  };

  const selectCuenta = (id) => {
    let findCuenta;
    if (id) {
      findCuenta = cuentas.find((cuenta) => cuenta._id === id);
      if (findCuenta) {
        setCuenta(findCuenta);
        setCuentaId(id);
        socket.emit("cuentaOcupada", id);
      }
    } else {
      setCuenta(initialCuenta);
      setCuentaId("");
      socket.emit("cuentaOcupada", "");
    }
  };

  return {
    cuentas,
    cuenta,
    setCuenta,
    createCuenta,
    updateCuenta,
    selectCuenta,
    reiniciarCuenta,
    cargarCuentas,
    cuentaId,
    initialCuenta,
    cuentaOcupada,
    getCuentasByFechas,
  };
}

export default useCuenta;
