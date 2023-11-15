import { Route, Routes } from "react-router-dom";

import AdminLogin from "../components/AdminLogin.jsx";
import MapComponent from "../components/MapComponent.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<MapComponent />} />
      </Routes>
    </>
  );
}

export default App;
