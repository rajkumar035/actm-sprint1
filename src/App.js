import React from "react";
import Home from "./containers/home";
import About from "./containers/about";
import Event from "./containers/events";
import Webinars from "./containers/webinars";
import Projects from "./containers/projects";
import Offers from "./containers/offers";
import Mission from "./containers/mission";
import Header from "./components/Header";
import CssAnimations from "./utils/animations";

function App() {
  window.addEventListener("mousemove", CssAnimations.customCursorOnMOuseMoveMethod);
  return (
    <article>
      <span className="cursor" />
      <span className="cursor2" />
      <Header />
      <Home id={"home"} />
      <About id={"about"} />
      <Event id={"events"} />
      <Webinars id={"webinars"} />
      <Projects id={"projects"} />
      <Offers id={"offers"} />
      <Mission id={"missions"} />
    </article>
  );
}

export default App;
