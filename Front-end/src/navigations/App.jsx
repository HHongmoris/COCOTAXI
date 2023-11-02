import { Route, Routes } from "react-router-dom";

import MapComponent from "../components/MapComponent.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MapComponent />} />
      </Routes>
    </>
  );
}

export default App;
