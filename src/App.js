import React from "react";
import Home from "./containers/home";
import About from "./containers/about";
import Event from "./containers/events";
import Webinars from "./containers/webinars";
import Projects from "./containers/projects";
import Offers from "./containers/offers";
import Mission from "./containers/mission";
import Header from "./components/Header";

function App() {
  return (
    <article>
      <Header />
      <Home />
      <About />
      <Event />
      <Webinars />
      <Projects />
      <Offers />
      <Mission />
    </article>
  );
}

export default App;
