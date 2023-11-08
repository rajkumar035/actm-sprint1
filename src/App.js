import { Route, Routes } from "react-router-dom";
import Home from "./containers/home";
import About from "./containers/about";
import Offers from "./containers/offers";
import Mission from "./containers/mission";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/missions" element={<Mission />} />
    </Routes>
  );
}

export default App;
