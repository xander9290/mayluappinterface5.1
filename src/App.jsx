import { useEffect, useState } from "react";
import BotoneraLateral from "./components/main/BotoneraLateral";
import CuentasActivas from "./components/main/CuentasActivas";
import ModalLogin from "./components/ModalLogin";
import Nav from "./components/nav/Nav";
import { appContext } from "./context/MainContext";

function App() {
  const { session } = appContext();
  const [modalLogin, setModalLogin] = useState(false);

  useEffect(() => {
    if (!session.login) setModalLogin(true);
  }, [session]);
  return (
    <div className="container-fluid bg-secondary">
      <Nav />
      <main className="main vh-100 d-flex user-select-none">
        <CuentasActivas />
        <BotoneraLateral />
      </main>
      <ModalLogin show={modalLogin} onHide={() => setModalLogin(false)} />
    </div>
  );
}

export default App;
